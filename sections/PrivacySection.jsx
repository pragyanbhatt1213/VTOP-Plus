'use client';

import { motion } from 'framer-motion';
import SecurityInfoCard from '@/components/SecurityInfoCard';
import TrustStrip from '@/components/TrustStrip';
import PlayProtectImage from '@/components/PlayProtectImage';

export default function PrivacySection() {
  return (
    <section id="privacy" className="py-32 sm:py-40 lg:py-56 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-4">
            Security First
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Your Trust is Our <span className="gradient-text">Priority</span>
          </h2>
          <p className="text-sm text-txt-secondary max-w-2xl mx-auto">
            Built with security-first design principles and verified by Google Play Protect
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Strip */}
            <TrustStrip variant="default" />

            {/* Security Info Card */}
            <div className="mb-8">
              <SecurityInfoCard />
            </div>

            {/* Additional Trust Message */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-accent-teal/5 border border-accent-teal/20 rounded-lg"
            >
              <p className="text-sm text-txt-secondary leading-relaxed">
                VTOP Plus does not store or share your data externally. Your credentials are only used to securely log in to the official VTOP portal. Everything stays on your device. You maintain complete control.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: Play Protect Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Play Protect Container */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="w-full max-w-sm"
            >
              <div className="play-protect-premium-container">
                <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-bg-mid to-bg-deep">
                  <PlayProtectImage />
                </div>
              </div>
            </motion.div>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs sm:text-sm text-txt-secondary text-center mt-6 max-w-sm"
            >
              This app has been verified as safe by <span className="text-accent-cyan font-semibold">Google Play Protect</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
