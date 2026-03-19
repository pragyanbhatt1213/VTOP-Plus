'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function SecurityInfoCard() {
  const features = [
    'Your credentials are encrypted and stored securely on your device using secure storage',
    'Login happens directly with official VTOP servers',
    'No data is sent to any external server',
    'We do not store or track your personal data',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="security-info-card"
    >
      <div className="flex gap-4 sm:gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent-cyan/10 border border-accent-cyan/25 flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(30,200,255,0.15)]">
            <Lock size={20} strokeWidth={1.8} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
            Secure Login
          </h3>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-txt-secondary leading-relaxed flex gap-2"
              >
                <span className="text-accent-cyan flex-shrink-0 mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
