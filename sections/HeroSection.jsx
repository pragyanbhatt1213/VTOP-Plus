'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import Shuffle from '@/components/Shuffle/Shuffle';

export default function HeroSection() {
  const phoneRef = useRef(null);

  useEffect(() => {
    const section = phoneRef.current?.closest('section');
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const frame = phoneRef.current?.querySelector('.phone-frame');
      if (frame) frame.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
    };
    const onLeave = () => {
      const frame = phoneRef.current?.querySelector('.phone-frame');
      if (frame) frame.style.transform = 'rotateX(0) rotateY(0)';
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badges */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-accent-cyan text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_8px_var(--accent-teal)]" />
              Built for VIT Bhopal Students
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-teal/20 bg-accent-teal/5 text-accent-teal text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-[0_0_8px_var(--accent-teal)]" />
              Now Updated to v1.2
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            <span className="shimmer-text">VTOP</span>
            <br />Plus
          </h1>

          <div className="text-lg sm:text-xl text-txt-secondary mb-4 leading-relaxed">
            <Shuffle
              text="A faster, cleaner way to access your VTOP data."
              shuffleDirection="right"
              duration={0.35}
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce
              triggerOnHover
            />
          </div>

          <p className="text-sm text-txt-muted max-w-md leading-relaxed mb-8">
            Skip the slow VTOP portal. Check attendance, timetable, exams, and seat details — all in one clean, fast app.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-bg-deep font-semibold text-sm
                         hover:shadow-[0_0_30px_rgba(30,200,255,0.25)] hover:scale-[1.03] transition-all duration-300"
            >
              <Download size={16} />
              Download APK
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-txt-secondary text-sm font-medium
                         hover:border-accent-cyan/20 hover:text-txt-primary transition-all"
            >
              View Features
              <ChevronDown size={14} />
            </a>
          </div>
        </motion.div>

        {/* ── Phone ── */}
        <motion.div
          ref={phoneRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
          style={{ perspective: '1200px' }}
        >
          <div className="relative animate-float">
            {/* Glow */}
            <div className="absolute -inset-16 rounded-full bg-[radial-gradient(ellipse,rgba(30,200,255,0.12)_0%,transparent_65%)] animate-glow-pulse pointer-events-none" />
            {/* Phone */}
            <div className="phone-frame transition-transform duration-150 ease-out">
              <img src="/screenshots/home.png" alt="VTOP Plus Dashboard" className="w-full h-full object-cover rounded-[32px] relative z-[1]" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
