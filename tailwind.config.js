/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          DEFAULT: '#08080A',
          light: '#0F0F12',
          lighter: '#18181C',
        },
        jade: {
          DEFAULT: '#00FFA3',
          dark: '#00CC82',
        },
        ember: {
          DEFAULT: '#FF3864',
          dark: '#CC2D50',
        },
        phosphor: {
          DEFAULT: '#00D4FF',
          dark: '#00A8CC',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'brutal-sm': '0 2px 8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'brutal': '0 4px 16px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'brutal-lg': '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow-jade': '0 0 20px rgba(0, 255, 163, 0.3), 0 0 40px rgba(0, 255, 163, 0.1)',
        'glow-ember': '0 0 20px rgba(255, 56, 100, 0.3), 0 0 40px rgba(255, 56, 100, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'snap-in': 'snapIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) both',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        snapIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}