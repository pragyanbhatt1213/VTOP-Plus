'use client';

import { motion } from 'framer-motion';
import { Download, Shield, Check, Clock } from 'lucide-react';
import Shuffle from '@/components/Shuffle/Shuffle';

const meta = [
  { icon: Shield, label: 'No data stored' },
  { icon: Check,  label: 'Android 6.0+' },
  { icon: Clock,  label: '~8 MB' },
];

export default function DownloadSection() {
  return (
    <section id="download" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-6">
            Get the App
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Download
            <br />
            <span className="gradient-text">
              <Shuffle text="VTOP Plus" duration={0.35} stagger={0.04} triggerOnce />
            </span>
          </h2>

          <p className="text-txt-secondary text-sm mb-10">
            Lightweight, fast, and built for VIT Bhopal students. Free to use, always.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl
                       bg-gradient-to-r from-accent-cyan/20 to-accent-teal/10
                       border border-accent-cyan/30 text-accent-cyan font-semibold text-sm
                       hover:shadow-[0_0_40px_rgba(30,200,255,0.15)] hover:scale-[1.03]
                       transition-all duration-300"
          >
            <Download size={18} />
            Download APK
          </a>

          <div className="flex items-center justify-center gap-8 mt-8">
            {meta.map((m) => (
              <div key={m.label} className="flex items-center gap-2 text-txt-muted text-xs font-mono">
                <m.icon size={14} strokeWidth={1.8} />
                {m.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
