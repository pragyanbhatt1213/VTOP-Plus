'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';

const trustItems = [
  { icon: Shield, label: 'End-to-End Secure' },
  { icon: Lock, label: 'No Data Collection' },
  { icon: Zap, label: 'Direct VTOP Connection' },
];

export default function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-wrap gap-3 justify-center mb-8"
    >
      {trustItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-gradient-to-r from-accent-cyan/10 to-accent-teal/5
                     border border-accent-cyan/30
                     opacity-90 hover:opacity-100 transition-opacity duration-300"
        >
          <item.icon size={14} strokeWidth={2} className="text-accent-cyan" />
          <span className="text-xs font-medium text-txt-primary whitespace-nowrap">
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
