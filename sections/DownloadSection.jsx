'use client';

import { motion } from 'framer-motion';
import { Download, Shield, Check, HardDrive } from 'lucide-react';
import Shuffle from '@/components/Shuffle/Shuffle';
import TrustStrip from '@/components/TrustStrip';
import SecurityInfoCard from '@/components/SecurityInfoCard';

const meta = [
  { icon: Shield, label: 'No data stored' },
  { icon: Check,  label: 'Android 6.0+' },
  { icon: HardDrive,  label: '~21 MB' },
];

export default function DownloadSection() {
  return (
    <section id="download" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
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

          <p className="text-txt-secondary text-sm mb-8">
            Lightweight, fast, and built for VIT Bhopal students. Free to use, always.
          </p>

          {/* Trust Strip */}
          <div className="mb-10">
            <TrustStrip />
          </div>

          {/* Security Info Card - Compact Version */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <SecurityInfoCard variant="compact" />
          </motion.div>

          {/* Download Button with glow */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <a
              href="https://github.com/pragyanbhatt1213/VTOP-Plus/releases/download/v1.1/VTOP.Plus.v1.1.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl
                         bg-gradient-to-r from-accent-cyan/20 to-accent-teal/10
                         border border-accent-cyan/40 text-accent-cyan font-semibold text-sm
                         hover:shadow-[0_0_40px_rgba(30,200,255,0.25)] 
                         hover:border-accent-cyan/60
                         transition-all duration-300 relative group"
            >
              {/* Glow background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              <Download size={18} />
              Download APK
            </a>
          </motion.div>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap"
          >
            {meta.map((m, idx) => (
              <div key={m.label} className="flex items-center gap-2 text-txt-muted text-xs font-mono">
                <m.icon size={14} strokeWidth={1.8} className="text-accent-cyan" />
                {m.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
