'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import ProblemSection from '@/sections/ProblemSection';
import FeaturesSection from '@/sections/FeaturesSection';
import InterfaceSection from '@/sections/InterfaceSection';
import PrivacySection from '@/sections/PrivacySection';
import DownloadSection from '@/sections/DownloadSection';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // ── Cursor glow ──
    const glow = document.getElementById('cursor-glow');
    let mx = -600, my = -600, gx = -600, gy = -600;

    const onMouse = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMouse);

    function tickGlow() {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      if (glow) { glow.style.left = gx + 'px'; glow.style.top = gy + 'px'; }
      requestAnimationFrame(tickGlow);
    }
    tickGlow();

    if ('ontouchstart' in window && glow) glow.style.display = 'none';

    // ── Particle canvas ──
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas?.getContext('2d');
    let W, H;
    const particles = [];
    const COLORS = ['rgba(30,200,255,', 'rgba(46,230,166,'];

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * (W || 1920), y: Math.random() * (H || 1080),
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.3 + 0.05,
        color: COLORS[Math.floor(Math.random() * 2)],
      });
    }

    function drawParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    return () => {
      document.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="section-divider" />
        <PrivacySection />
        <div className="section-divider" />
        <ProblemSection />
        <div className="section-divider" />
        <FeaturesSection />
        <div className="section-divider" />
        <InterfaceSection />
        <div className="section-divider" />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
