'use client';

import { motion } from 'framer-motion';
import { Clock, Menu, MapPin } from 'lucide-react';
import Shuffle from '@/components/Shuffle/Shuffle';

const problems = [
  {
    icon: Clock,
    title: 'Slow Portal',
    desc: 'Multiple page loads just to find basic information. Frequent delays and timeouts.',
    delay: 0,
  },
  {
    icon: Menu,
    title: 'Too Much Navigation',
    desc: 'Nested menus and extra clicks just to check attendance or exam schedules.',
    delay: 0.1,
  },
  {
    icon: MapPin,
    title: 'Hard to Track Exams',
    desc: 'Seat numbers, venues, and reporting times buried deep in the portal.',
    delay: 0.2,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProblemSection() {
  return (
    <section id="why" className="py-32 sm:py-40 lg:py-56 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-px bg-accent-cyan/40" />
            The Problem
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            <Shuffle text="Why VTOP Plus?" duration={0.3} stagger={0.025} triggerOnce />
          </h2>
          <p className="text-txt-secondary text-sm max-w-lg">
            The VTOP portal works — but barely. Here&apos;s what students deal with daily.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="glass-card p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-cyan/8 border border-accent-cyan/15 flex items-center justify-center text-accent-cyan mb-5">
                <p.icon size={18} strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-semibold mb-2">{p.title}</h3>
              <p className="text-xs text-txt-secondary leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
