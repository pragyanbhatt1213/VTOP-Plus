/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './sections/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#081426',
          mid: '#0C1F36',
          light: '#0E2A47',
        },
        accent: {
          cyan: '#1EC8FF',
          teal: '#2EE6A6',
        },
        txt: {
          primary: '#E8F0FF',
          secondary: '#9FB3C8',
          muted: '#6F859C',
        },
        card: {
          border: 'rgba(30,200,255,0.35)',
          bg: 'rgba(12, 31, 54, 0.6)',
          hover: 'rgba(30,200,255,0.06)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
