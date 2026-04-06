'use client';

import { motion } from 'framer-motion';
import { Lock, BarChart3, Calendar, RefreshCw, AlertCircle, Bug } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Seamless Login',
    description: 'Login system redesigned. More stable authentication. No random failures.',
  },
  {
    icon: BarChart3,
    title: 'Smart Attendance Insights',
    description: 'Track marks eligibility per subject. Select target (1–5 marks). See how many classes needed.',
    badge: 'NEW',
  },
  {
    icon: Calendar,
    title: 'Smarter Exams',
    description: '"Exams start in X days" counter. Shows exam period correctly. Past exams hidden.',
  },
  {
    icon: RefreshCw,
    title: 'Better Session Handling',
    description: 'No forced logout. Stay logged in. Cached data access.',
  },
  {
    icon: AlertCircle,
    title: 'Improved Attendance Page',
    description: 'Re-login option added. Clear cached vs live data. Better insights.',
  },
  {
    icon: Bug,
    title: 'Bug Fixes',
    description: 'Login issues fixed. Exam detection corrected. Improved stability.',
  },
];

export default function WhatsNewSection() {
  return (
    <section className="py-32 sm:py-40 lg:py-56 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-4">
            Latest Update
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What's New in <span className="gradient-text">v1.2</span>
          </h2>
          <p className="text-txt-secondary text-lg max-w-2xl mx-auto">
            Packed with improvements, new features, and bug fixes to give you the best experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-accent-cyan/8 to-accent-teal/5 border border-accent-cyan/20 hover:border-accent-cyan/40 transition-all duration-300">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={20} strokeWidth={1.8} />
                  </div>

                  {/* Title with Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    {feature.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-accent-teal/20 border border-accent-teal/40 text-accent-teal rounded-full">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-txt-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-txt-secondary">
            Ready to experience the improvements?{' '}
            <a href="#download" className="text-accent-cyan font-semibold hover:text-accent-teal transition-colors">
              Download v1.2 now
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
