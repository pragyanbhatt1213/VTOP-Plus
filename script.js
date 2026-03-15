/* ═══════════════════════════════════════════════════════
   VTOP Plus — Premium Landing Page Scripts
   Cursor glow, particles, parallax tilt, scroll fade-in
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── 1. CURSOR-FOLLOWING GRADIENT SPOTLIGHT ──
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = -600, mouseY = -600;
  let glowX = -600, glowY = -600;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Hide glow on touch devices
  if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
  }

  // ── 2. FLOATING PARTICLES ──
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const PARTICLE_COUNT = 70;
  const COLORS = ['rgba(30,200,255,', 'rgba(46,230,166,'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.35 + 0.05,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ── 3. SCROLL FADE-IN (Intersection Observer) ──
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el) => observer.observe(el));

  // Trigger hero elements immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-in').forEach((el) => {
      el.classList.add('visible');
    });
  }, 80);

  // ── 4. HERO PHONE 3D TILT ON MOUSE MOVE ──
  const heroPhone = document.getElementById('hero-phone');
  if (heroPhone) {
    const phoneFrame = heroPhone.querySelector('.phone-frame');
    const heroSection = heroPhone.closest('section');

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -8;
      const tiltY = x * 8;
      phoneFrame.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      phoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // ── 5. NAV SCROLL EFFECT ──
  const nav = document.getElementById('main-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // ── 6. MOBILE NAV TOGGLE ──
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ── 7. SMOOTH ANCHOR SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
