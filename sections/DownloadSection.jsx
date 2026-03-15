'use client';

import { motion } from 'framer-motion';
import { Download, Shield, Smartphone } from 'lucide-react';
import Shuffle from '@/components/Shuffle/Shuffle';

const meta = [
  { icon: Shield, label: 'No data stored' },
  { icon: Smartphone, label: 'Android 6.0+' },
  { icon: Download, label: '21 MB' },
];

export default function DownloadSection() {
  return (
    <section id="download" className="py-32 sm:py-40 lg:py-56 px-6">
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

          <p className="text-txt-secondary text-sm mb-10 max-w-xl mx-auto">
            Lightweight, fast, and built for VIT Bhopal students. Free to use, always.
          </p>

          <motion.a
            href="https://github.com/pragyanbhatt1213/VTOP-Plus/releases/download/version/VTOP.Plus.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-2xl
                       bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-teal
                       text-dark font-bold text-sm
                       shadow-[0_0_30px_rgba(30,200,255,0.3)]
                       hover:shadow-[0_0_60px_rgba(30,200,255,0.5)]
                       transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} strokeWidth={2.5} />
            Download APK
          </motion.a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-txt-muted/10">
            {meta.map((m) => (
              <motion.div
                key={m.label}
                className="flex items-center gap-2 text-txt-secondary text-xs font-mono"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <m.icon size={16} strokeWidth={1.8} className="text-accent-cyan" />
                {m.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
