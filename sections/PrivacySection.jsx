'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacySection() {
  return (
    <section id="privacy" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 sm:p-14 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center text-accent-teal mx-auto mb-6">
            <Shield size={22} strokeWidth={1.8} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Privacy &amp; Security</h2>
          <p className="text-sm text-txt-secondary leading-relaxed max-w-lg mx-auto">
            VTOP Plus does not store or share your data externally. Your credentials are only used to
            securely log in to the official VTOP portal. Everything stays on your device.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
