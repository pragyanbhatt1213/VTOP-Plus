'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Activity, CalendarDays, Clock,
  MapPin, WifiOff, Bell, Zap,
} from 'lucide-react';
import Shuffle from '@/components/Shuffle/Shuffle';

const features = [
  { icon: LayoutDashboard, title: 'Smart Dashboard',      desc: 'Attendance, exams, and semester details at a glance.',         accent: 'cyan' },
  { icon: Activity,        title: 'Attendance Tracking',   desc: 'Subject-wise breakdown with threshold alerts.',               accent: 'teal' },
  { icon: CalendarDays,    title: 'Interactive Timetable', desc: 'Clean grid layout with course codes and room numbers.',       accent: 'cyan' },
  { icon: Clock,           title: 'Exam Countdown',        desc: 'Countdown timers with reporting time and venue details.',     accent: 'teal' },
  { icon: MapPin,          title: 'Seat Location',         desc: 'Seat number and venue right inside each exam card.',          accent: 'cyan' },
  { icon: WifiOff,         title: 'Offline Access',        desc: 'View cached data even when VTOP is slow or unreachable.',    accent: 'teal' },
  { icon: Bell,            title: 'Smart Notifications',   desc: 'Class reminders and exam alerts, tuned to your schedule.',   accent: 'cyan' },
  { icon: Zap,             title: 'Built for Performance', desc: 'Lightweight and fast, optimized for every device.',          accent: 'teal' },
];

const cardV = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 sm:py-40 lg:py-56 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-px bg-accent-cyan/40" />
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            <Shuffle text="Key Features" duration={0.3} stagger={0.025} triggerOnce />
          </h2>
          <p className="text-txt-secondary text-sm">
            Everything you need for academics, in one focused app.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const isCyan = f.accent === 'cyan';
            return (
              <motion.div
                key={f.title}
                custom={i}
                variants={cardV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-30px' }}
                className="glass-card p-6 group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border
                  ${isCyan
                    ? 'bg-accent-cyan/[0.08] border-accent-cyan/[0.18] text-accent-cyan'
                    : 'bg-accent-teal/[0.08] border-accent-teal/[0.18] text-accent-teal'
                  }`}
                >
                  <f.icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="text-sm font-semibold mb-2">{f.title}</h3>
                <p className="text-xs text-txt-secondary leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
