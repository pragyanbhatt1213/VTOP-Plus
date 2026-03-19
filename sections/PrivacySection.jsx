'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import TrustStrip from '@/components/TrustStrip';
import SecurityInfoCard from '@/components/SecurityInfoCard';
import SecurityDetailsSection from './SecurityDetailsSection';

export default function PrivacySection() {
  return (
    <section id="security" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Privacy &amp; Security
          </h2>
          <p className="text-txt-secondary text-sm max-w-2xl mx-auto">
            Built with security-first design principles. Your trust is our priority.
          </p>
        </motion.div>

        {/* Trust Strip */}
        <TrustStrip />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Security Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SecurityInfoCard />
          </motion.div>

          {/* Right: Play Protect Proof */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              className="w-full max-w-xs rounded-[20px] p-3
                         bg-gradient-to-br from-accent-cyan/8 to-transparent
                         border border-accent-cyan/25
                         shadow-[0_0_30px_rgba(30,200,255,0.15)]
                         overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/screenshots/Google-play-protect.png"
                alt="Google Play Protect Verification"
                className="w-full h-auto rounded-[16px] object-cover"
              />
            </motion.div>
            <p className="text-xs text-txt-secondary text-center max-w-xs">
              Verified as safe by <span className="text-accent-cyan font-semibold">Google Play Protect</span>
            </p>
          </motion.div>
        </div>

        {/* Expandable Security Details */}
        <SecurityDetailsSection />
      </div>
    </section>
  );
}
