'use client';

import dynamic from 'next/dynamic';
import Shuffle from '@/components/Shuffle/Shuffle';

const CircularGallery = dynamic(
  () => import('@/components/CircularGallery/CircularGallery'),
  { ssr: false },
);

const items = [
  { image: '/screenshots/home.png', text: 'Dashboard' },
  { image: '/screenshots/attendance.png', text: 'Attendance Tracking' },
  { image: '/screenshots/attendence detail.png', text: 'Details' },
  { image: '/screenshots/timetable.png', text: 'Timetable View' },
  { image: '/screenshots/exam.png', text: 'Exam Schedule' },
  { image: '/screenshots/setting.png', text: 'Settings' },
];

export default function InterfaceSection() {
  return (
    <section id="preview" className="py-32 sm:py-40 lg:py-56 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-20 sm:mb-28">
        <div className="inline-flex items-center gap-3 text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-4">
          <span className="w-8 h-px bg-accent-cyan/40" />
          Interface Preview
          <span className="w-8 h-px bg-accent-cyan/40" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <Shuffle
            text="Explore the Interface"
            shuffleDirection="right"
            duration={0.35}
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce
          />
        </h2>

        <p className="text-txt-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Clean, purpose-built screens designed around how students actually use their academic data. Every interaction optimized for speed and clarity.
        </p>
      </div>

      {/* Gallery Container */}
      <div style={{ height: '650px', position: 'relative', overflow: 'hidden' }}>
        {/* Background gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 via-transparent to-accent-teal/5 rounded-3xl pointer-events-none" />

        {/* Gallery */}
        <CircularGallery items={items} borderRadius={0.05} />
      </div>

      {/* Helper text */}
      <div className="text-center mt-16">
        <p className="text-txt-muted text-sm font-mono tracking-widest uppercase opacity-60">
          Drag or scroll to explore
        </p>
      </div>
    </section>
  );
}
