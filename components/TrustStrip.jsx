'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, Zap } from 'lucide-react';

export default function TrustStrip({ variant = 'default' }) {
  const items = [
    { icon: Lock, label: 'End-to-End Secure' },
    { icon: Shield, label: 'No Data Collection' },
    { icon: Zap, label: 'Direct VTOP Connection' },
  ];

  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-wrap gap-2 sm:gap-3 justify-center ${
        isCompact ? 'mb-6' : 'mb-10'
      }`}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          className="trust-pill"
        >
          <item.icon size={isCompact ? 14 : 16} strokeWidth={2} />
          <span className={isCompact ? 'text-xs' : 'text-sm'}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
