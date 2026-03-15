'use client';

import { useRef, useEffect } from 'react';
import './CircularGallery.css';

export default function CircularGallery({ items = [], borderRadius = 0.05 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let alive = true;
    let renderer, gl, camera, scene, raf;
    const planes = [];
    const scroll = { current: 0, target: 0 };
    let dragging = false, startX = 0, dragStart = 0;

    // Mobile aspect ratio: 9:19.5 ≈ 0.456
    const MOBILE_ASPECT = 0.456;
    let planeHeight = 0,
      planeWidth = 0,
      spacing = 0;
    
    // Viewport to convert HTML dimensions to WebGL units
    let viewport = { width: 0, height: 0 };

    async function boot() {
      const OGL = await import('ogl');
      if (!alive) return;

      const box = containerRef.current;
      if (!box) return;

      // Create renderer
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer = new OGL.Renderer({
        dpr,
        alpha: true,
        antialias: true,
      });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      
      gl.canvas.style.position = 'absolute';
      gl.canvas.style.top = '0';
      gl.canvas.style.left = '0';
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      
      box.appendChild(gl.canvas);

      // Create camera
      camera = new OGL.Camera(gl, { fov: 45 });
      camera.position.z = 8;

      // Create scene
      scene = new OGL.Transform();

      // Vertex shader
      const vertexShader = `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      // Fragment shader with rounded corners
      const fragmentShader = `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uAlpha;
        varying vec2 vUv;

        float sdfRoundedBox(vec2 p, vec2 b, float r) {
          vec2 q = abs(p) - b + r;
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
        }

        void main() {
          vec2 p = vUv - 0.5;
          vec2 halfSize = vec2(0.5);
          float d = sdfRoundedBox(p, halfSize, uBorderRadius);
          
          vec4 texColor = texture2D(tMap, vUv);
          
          gl_FragColor = vec4(texColor.rgb, texColor.a * uAlpha);
          
          // Apply border radius by discarding fragments outside the rounded box
          if (d > 0.0) gl_FragColor.a = 0.0;
        }
      `;

      // Plane geometry
      const planeGeometry = new OGL.Plane(gl, { width: 1, height: 1 });

      // Function to resize and recalculate dimensions
      function updateDimensions() {
        const { width, height } = box.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.perspective({ aspect: width / height });

        // Calculate viewport in WebGL units
        const fov = (camera.fov * Math.PI) / 180;
        const fovHeight = 2 * Math.tan(fov / 2) * camera.position.z;
        const fovWidth = fovHeight * (width / height);
        viewport = { width: fovWidth, height: fovHeight };

        // Calculate plane dimensions based on mobile aspect ratio in WebGL units
        planeHeight = fovHeight * 0.7; // Screenshots take up 70% of the viewport height
        planeWidth = planeHeight * MOBILE_ASPECT;
        spacing = planeWidth * 0.4; // Gap between planes
      }

      updateDimensions();
      window.addEventListener('resize', updateDimensions);

      // Create textures and planes
      items.forEach((item) => {
        const texture = new OGL.Texture(gl, {
          generateMipmaps: true,
          minFilter: gl.LINEAR_MIPMAP_LINEAR,
          magFilter: gl.LINEAR,
        });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          texture.image = img;
          program.uniforms.uImageSizes = { value: [img.width, img.height] };
          texture.needsUpdate = true;
        };
        img.src = item.image;

        const program = new OGL.Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
            tMap: { value: texture },
            uBorderRadius: { value: borderRadius },
            uAlpha: { value: 1 },
          },
          transparent: true,
          depthTest: false,
        });

        const mesh = new OGL.Mesh(gl, {
          geometry: planeGeometry,
          program,
        });
        mesh.setParent(scene);
        mesh.data = { label: item.text };
        planes.push(mesh);
      });

      // Create labels
      const labels = items.map((item) => {
        const label = document.createElement('div');
        label.className = 'cg-label';
        label.textContent = item.text;
        box.appendChild(label);
        return label;
      });

      // Scroll interaction
      function onWheel(e) {
        e.preventDefault();
        // Slowed down wheel speed to 0.15 for professional elegance
        scroll.target += e.deltaY * 0.15;
      }

      function onPointerDown(e) {
        dragging = true;
        startX = e.clientX || e.touches?.[0]?.clientX || 0;
        dragStart = scroll.target;
        box.style.cursor = 'grabbing';
      }

      function onPointerMove(e) {
        if (!dragging) return;
        const x = e.clientX || e.touches?.[0]?.clientX || 0;
        // Slowed down drag speed to 0.4
        scroll.target = dragStart - (x - startX) * 0.4;
      }

      function onPointerUp() {
        dragging = false;
        box.style.cursor = 'grab';
      }

      // Attach event listeners
      box.addEventListener('wheel', onWheel, { passive: false });
      box.addEventListener('mousedown', onPointerDown);
      box.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchend', onPointerUp);
      box.style.cursor = 'grab';

      // Render loop
      let frames = 0;
      function animate() {
        if (!alive) return;
        frames++;

        // Smooth scroll implementation with elegant easing (0.05 vs old 0.08)
        scroll.current += (scroll.target - scroll.current) * 0.05;

        const { width } = box.getBoundingClientRect();
        const totalWidth = items.length * (planeWidth + spacing);

        planes.forEach((mesh, i) => {
          // Calculate position
          const xPos = i * (planeWidth + spacing) - scroll.current;

          // Wrap around for infinite scroll
          const wrappedX =
            ((xPos % totalWidth) + totalWidth) % totalWidth -
            totalWidth / 2;

          mesh.position.x = wrappedX;

          // Curved arc effect: flatten the max distance to make a professional sweeping curve
          const maxDist = viewport.width * 0.75; 
          const distFromCenter = Math.abs(wrappedX);
          const angleRadians = Math.asin(
            Math.min(distFromCenter / maxDist, 1)
          );

          // Subtler Y-drop and gentle depth pushback
          mesh.position.y = -(maxDist - maxDist * Math.cos(angleRadians)) * 0.15;
          mesh.position.z = -Math.abs(wrappedX) * 0.08; 
          
          // Smoother 3D Rotation (reduced tilt)
          mesh.rotation.z = wrappedX > 0 ? angleRadians * 0.05 : -angleRadians * 0.05;
          mesh.rotation.y = wrappedX > 0 ? -angleRadians * 0.12 : angleRadians * 0.12;

          // Graceful scaling
          const scaleAmount = 1 - Math.min(Math.abs(wrappedX) / maxDist, 0.4) * 0.15;
          mesh.scale.x = planeWidth * scaleAmount;
          mesh.scale.y = planeHeight * scaleAmount;
          mesh.scale.z = 1;

          // Smoother opacity fade at edges
          const opacity = 1 - Math.max(0, Math.abs(wrappedX) - maxDist * 0.5) / (maxDist * 0.45);
          mesh.program.uniforms.uAlpha.value = Math.max(0, opacity);

          // Position label
          if (labels[i]) {
            const rect = box.getBoundingClientRect();
            const hw = rect.width / 2;
            const hh = rect.height / 2;

            const fov = (camera.fov * Math.PI) / 180;
            const camDist = camera.position.z;
            const vHeight = 2 * Math.tan(fov / 2) * camDist;
            const vWidth = vHeight * (rect.width / rect.height);

            const screenX = hw + (mesh.position.x / vWidth) * rect.width;
            const screenY =
              hh -
              (mesh.position.y / vHeight) * rect.height +
              planeHeight * 0.4;

            labels[i].style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, 0)`;
            labels[i].style.opacity = Math.max(0, opacity).toString();
          }
        });

        renderer.render({ scene, camera });
        raf = requestAnimationFrame(animate);
      }
      animate();

      // Cleanup function
      containerRef.current.cleanup = () => {
        window.removeEventListener('resize', updateDimensions);
        box.removeEventListener('wheel', onWheel);
        box.removeEventListener('mousedown', onPointerDown);
        box.removeEventListener('touchstart', onPointerDown);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchend', onPointerUp);
        cancelAnimationFrame(raf);
        labels.forEach((l) => l.remove());
        planeGeometry.destroy();
        planes.forEach((plane) => {
          plane.program.destroy();
        });
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        if (gl.canvas.parentNode)
          gl.canvas.parentNode.removeChild(gl.canvas);
      };
    }

    boot();

    return () => {
      alive = false;
      containerRef.current?.cleanup?.();
    };
  }, [items, borderRadius]);

  return (
    <div ref={containerRef} className="cg-container" style={{ position: 'relative' }} />
  );
}
