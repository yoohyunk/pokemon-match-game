import { transform } from 'typescript'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { lg: '1024px' },
    extend: {
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 0px #0000' },
          '100%': {
            boxShadow:
              '0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #08f, 0 0 15px #08f, 0 0 30px #08f',
          },
        },
        glowReverse: {
          from: {
            boxShadow:
              '0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #08f, 0 0 15px #08f, 0 0 30px #08f',
          },
          to: { boxShadow: '0 0 0px #0000' },
        },
        bounces: {
          '0%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0px)' },
          '75%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        glow: 'glow 1s ease-in-out forwards',
        'glow-reverse': 'glowReverse 1s ease-in-out forwards',
        bounces: 'bounces 1s linear  forwards',
      },
    },
  },
  plugins: [],
}
