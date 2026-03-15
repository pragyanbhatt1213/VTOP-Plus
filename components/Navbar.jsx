'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Why VTOP+', href: '#why' },
    { label: 'Features', href: '#features' },
    { label: 'Interface', href: '#preview' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-deep/90 backdrop-blur-xl border-b border-white/[0.04] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 text-accent-cyan font-mono text-sm font-medium tracking-wide no-underline">
          <img src="/icon.png" alt="VTOP Plus" className="w-7 h-7 rounded-[7px] drop-shadow-[0_0_6px_rgba(30,200,255,0.3)]" />
          VTOP Plus
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-txt-secondary p-1"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Links */}
        <div className={`items-center gap-8 ${open ? 'flex flex-col absolute top-16 left-0 right-0 bg-bg-deep/95 backdrop-blur-xl p-6 border-b border-white/[0.04]' : 'hidden md:flex'}`}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-txt-secondary text-[13px] font-medium tracking-wide hover:text-txt-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/pragyanbhatt1213/VTOP-Plus/blob/main/apk/VTOP%20Plus.apk"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-accent-cyan text-[13px] font-medium border border-accent-cyan/30 rounded-full px-4 py-1.5 hover:bg-accent-cyan/10 transition-all"
          >
            Download APK
          </a>
        </div>
      </div>
    </nav>
  );
}
