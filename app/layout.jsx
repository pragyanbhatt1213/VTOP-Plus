import { Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: 'VTOP Plus — Smarter Academic Access for VIT Bhopal',
  description:
    'A modern mobile app for VIT Bhopal students. Access attendance, timetable, exams, and more — faster and cleaner than the official portal.',
  icons: { icon: '/icon.png' },
  themeColor: '#081426',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {/* Background effects */}
        <div id="cursor-glow" />
        <canvas id="bg-canvas" />
        <div className="radial-glow g1" />
        <div className="radial-glow g2" />
        <div className="radial-glow g3" />

        {/* Content */}
        {children}
      </body>
    </html>
  );
}
