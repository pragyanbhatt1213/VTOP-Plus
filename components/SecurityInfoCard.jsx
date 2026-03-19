'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';

export default function SecurityInfoCard({ variant = 'default' }) {
  const items = [
    {
      icon: Lock,
      title: 'Encrypted Storage',
      text: 'Your credentials are encrypted and stored securely on your device using secure storage',
    },
    {
      icon: CheckCircle2,
      title: 'Direct Connection',
      text: 'Login happens directly with official VTOP servers — no intermediaries',
    },
    {
      icon: Shield,
      title: 'Zero Data Collection',
      text: 'We do not store, track, or share your personal data with any external service',
    },
  ];

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 border border-accent-cyan/25"
      >
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <item.icon
                size={18}
                strokeWidth={1.8}
                className="text-accent-cyan flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-xs font-semibold text-txt-primary">{item.title}</p>
                <p className="text-xs text-txt-secondary leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 sm:p-10 border border-accent-cyan/25 bg-gradient-to-br from-accent-cyan/8 to-accent-teal/5"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
          <Shield size={20} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Secure Login</h3>
          <p className="text-sm text-txt-secondary">Military-grade encryption, zero external storage</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 pb-3 border-b border-accent-cyan/10 last:border-b-0 last:pb-0">
            <item.icon
              size={16}
              strokeWidth={1.8}
              className="text-accent-teal flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-semibold text-txt-primary">{item.title}</p>
              <p className="text-xs text-txt-secondary leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
