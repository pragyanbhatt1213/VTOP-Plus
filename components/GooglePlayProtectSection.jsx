'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function GooglePlayProtectSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4 mb-10"
    >
      <div className="text-accent-cyan text-xs font-mono tracking-[0.15em] uppercase">
        Verified Security
      </div>

      {/* Play Protect Image Container */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="play-protect-container"
      >
        <div className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden border border-accent-cyan/20 bg-bg-deep/50 shadow-[0_0_30px_rgba(30,200,255,0.2)]">
          <Image
            src="/screenshots/play-protect.png"
            alt="Google Play Protect verification"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </motion.div>

      {/* Caption */}
      <p className="text-xs sm:text-sm text-txt-secondary text-center max-w-sm">
        This app has been scanned and verified as safe by Google Play Protect.
      </p>
    </motion.div>
  );
}
