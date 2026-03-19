'use client';

import { useRef, useEffect } from 'react';
import './CircularGallery.css';

export default function CircularGallery({
  items = [],
  bend = 1,
  textColor = '#ffffff',
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let alive = true;
    let renderer, gl, camera, scene, raf;
    const planes = [];
    const scroll = { current: 0, target: 0 };
    let dragging = false, startX = 0, dragStart = 0;

const PW = 1.8;
      const PH = 3.1;
      const GAP = 0.5;
    const SPACING = PW + GAP;

    async function boot() {
      const OGL = await import('ogl');
      if (!alive) return;

      const box = containerRef.current;
      if (!box) return;

      /* ── renderer ── */
      renderer = new OGL.Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
        antialias: true,
      });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      box.appendChild(gl.canvas);

      /* ── camera ── */
      camera = new OGL.Camera(gl, { fov: 50 });
      camera.position.z = 5.5;

      /* ── scene ── */
      scene = new OGL.Transform();

      /* ── shaders ── */
      const vertex = /* glsl */ `
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

      const fragment = /* glsl */ `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uRadius;
        uniform float uAlpha;
        varying vec2 vUv;

        float sdfRoundedBox(vec2 p, vec2 b, float r) {
          vec2 q = abs(p) - b + r;
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
        }

        void main() {
          vec2 uv = vUv;
          float d = sdfRoundedBox(uv - 0.5, vec2(0.5), uRadius);
          if (d > 0.002) discard;

          // Center the texture with proper aspect ratio handling
          vec2 centeredUv = uv - 0.5;
          centeredUv *= 1.1;
          centeredUv += 0.5;
          
          // Clamp to prevent edge artifacts
          centeredUv = clamp(centeredUv, vec2(0.0), vec2(1.0));
          
          vec4 tex = texture2D(tMap, centeredUv);
          float edge = 1.0 - smoothstep(-0.005, 0.002, d);
          gl_FragColor = vec4(tex.rgb, tex.a * uAlpha * edge);
        }
      `;

      /* ── meshes ── */
      const geom = new OGL.Plane(gl, { width: PW, height: PH });

      items.forEach((item, i) => {
        const texture = new OGL.Texture(gl, { generateMipmaps: true });
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => { texture.image = img; };
        img.src = item.image;

        const program = new OGL.Program(gl, {
          vertex, fragment,
          uniforms: {
            tMap: { value: texture },
            uRadius: { value: borderRadius },
            uAlpha: { value: 1 },
          },
          transparent: true,
          depthTest: false,
        });

        const mesh = new OGL.Mesh(gl, { geometry: geom, program });
        mesh.setParent(scene);
        planes.push({ mesh, program, idx: i });
      });

      /* ── labels ── */
      const labels = items.map((item, i) => {
        const el = document.createElement('div');
        el.className = 'cg-label';
        el.style.color = textColor;
        el.textContent = item.text;
        box.appendChild(el);
        return el;
      });

      /* ── resize ── */
      function onResize() {
        if (!box || !renderer) return;
        const { width, height } = box.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.perspective({ aspect: width / height });
      }
      onResize();
      window.addEventListener('resize', onResize);

      /* ── input ── */
      function onWheel(e) { scroll.target += e.deltaY * scrollSpeed * 0.003; }

      function onPointerDown(e) {
        dragging = true;
        startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        dragStart = scroll.target;
        box.style.cursor = 'grabbing';
      }
      function onPointerMove(e) {
        if (!dragging) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        scroll.target = dragStart - (x - startX) * 0.005 * scrollSpeed;
      }
      function onPointerUp() {
        dragging = false;
        box.style.cursor = 'grab';
      }

      box.addEventListener('wheel', onWheel, { passive: true });
      box.addEventListener('mousedown', onPointerDown);
      box.addEventListener('touchstart', (e) => onPointerDown(e.touches[0] ? e : e), { passive: true });
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('touchmove', (e) => onPointerMove(e.touches?.[0] || e), { passive: true });
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchend', onPointerUp);
      box.style.cursor = 'grab';

      /* ── render loop ── */
      const totalW = items.length * SPACING;

      function tick() {
        if (!alive) return;
        scroll.current += (scroll.target - scroll.current) * scrollEase;

        planes.forEach(({ mesh, idx }, i) => {
          let x = (idx * SPACING - scroll.current) % totalW;
          if (x < -totalW / 2) x += totalW;
          if (x > totalW / 2) x -= totalW;

          mesh.position.x = x;

          const norm = x / (totalW * 0.5);
          mesh.position.y = -bend * norm * norm * 2.0;
          mesh.position.z = -Math.abs(norm) * bend * 0.6;

          mesh.rotation.y = -norm * bend * 0.15;

          /* project label position */
          if (labels[i]) {
            const rect = box.getBoundingClientRect();
            const hw = rect.width / 2;
            const hh = rect.height / 2;

            const fov = (camera.fov * Math.PI) / 180;
            const dist = camera.position.z;
            const visH = 2 * Math.tan(fov / 2) * dist;
            const visW = visH * (rect.width / rect.height);

            const sx = hw + (mesh.position.x / visW) * rect.width;
            const sy = hh - ((mesh.position.y - PH * 0.58) / visH) * rect.height;

            labels[i].style.transform = `translate(${sx}px, ${sy}px) translate(-50%, 0)`;
            labels[i].style.opacity = Math.abs(norm) < 0.9 ? '1' : '0';
          }
        });

        renderer.render({ scene, camera });
        raf = requestAnimationFrame(tick);
      }
      tick();

      /* ── cleanup ref ── */
      containerRef.current._destroy = () => {
        window.removeEventListener('resize', onResize);
        box.removeEventListener('wheel', onWheel);
        box.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchend', onPointerUp);
        cancelAnimationFrame(raf);
        labels.forEach((l) => l.remove());
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      };
    }

    boot();

    return () => {
      alive = false;
      containerRef.current?._destroy?.();
    };
  }, [items, bend, textColor, borderRadius, scrollSpeed, scrollEase]);

  return <div ref={containerRef} className="cg-container" />;
}
