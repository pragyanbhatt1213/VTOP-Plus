'use client';

import dynamic from 'next/dynamic';
import Shuffle from '@/components/Shuffle/Shuffle';

const CircularGallery = dynamic(
  () => import('@/components/CircularGallery/CircularGallery'),
  { ssr: false },
);

const items = [
  { image: '/screenshots/home.png',              text: 'Dashboard' },
  { image: '/screenshots/attendance.png',         text: 'Attendance' },
  { image: '/screenshots/attendence detail.png',  text: 'Detail View' },
  { image: '/screenshots/timetable.png',          text: 'Timetable' },
  { image: '/screenshots/exam.png',               text: 'Exam Schedule' },
  { image: '/screenshots/setting.png',            text: 'Settings' },
];

export default function InterfaceSection() {
  return (
    <section id="preview" className="py-32 px-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-3 text-accent-cyan text-xs font-mono tracking-[0.2em] uppercase mb-4">
          <span className="w-8 h-px bg-accent-cyan/40" />
          Interface
          <span className="w-8 h-px bg-accent-cyan/40" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
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

        <p className="text-txt-secondary text-sm max-w-md mx-auto">
          Drag or scroll to explore. Clean screens designed for how students actually use their data.
        </p>
      </div>

      {/* Gallery */}
      <div className="h-[600px] sm:h-[700px] lg:h-[750px] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 via-transparent to-accent-teal/5 rounded-2xl pointer-events-none" />
        <CircularGallery
          items={items}
          bend={0.8}
          textColor="#1ec8ff"
          borderRadius={0.08}
          scrollSpeed={2.5}
          scrollEase={0.06}
        />
      </div>

    </section>
  );
}
