/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class', '[data-theme="dark"]'], // Enable dark mode with data-theme="dark"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          50: 'var(--primary-50, #f5f3ff)',
          100: 'var(--primary-100, #ede9fe)',
          200: 'var(--primary-200, #ddd6fe)',
          300: 'var(--primary-300, #c4b5fd)',
          400: 'var(--primary-400, #a78bfa)',
          500: 'var(--primary-500, #8b5cf6)',
          600: 'var(--primary-600, #7c3aed)',
          700: 'var(--primary-700, #6d28d9)',
          800: 'var(--primary-800, #5b21b6)',
          900: 'var(--primary-900, #4c1d95)',
        },
        background: {
          DEFAULT: 'var(--background, #f9fafb)',
          card: 'var(--card-bg, #ffffff)',
        },
        text: {
          primary: 'var(--text, #1f2937)',
          secondary: 'var(--text-secondary, #6b7280)',
        },
        success: {
          DEFAULT: 'var(--success, #10b981)',
          50: 'var(--success-50, #ecfdf5)',
          100: 'var(--success-100, #d1fae5)',
          200: 'var(--success-200, #a7f3d0)',
          300: 'var(--success-300, #6ee7b7)',
          400: 'var(--success-400, #34d399)',
          500: 'var(--success-500, #10b981)',
          600: 'var(--success-600, #059669)',
          700: 'var(--success-700, #047857)',
          800: 'var(--success-800, #065f46)',
          900: 'var(--success-900, #064e3b)',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow': '0 0 10px 2px rgba(124, 58, 237, 0.5)',
        'glow-lg': '0 0 25px 5px rgba(124, 58, 237, 0.6)',
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'transform': 'transform',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    function({ addBase, theme }) {
      // Add base styles for light theme
      addBase({
        ':root': {
          '--primary': theme('colors.primary.600'),
          '--primary-light': theme('colors.primary.400'),
          '--background': theme('colors.gray.50'),
          '--card-bg': theme('colors.white'),
          '--text': theme('colors.gray.900'),
          '--text-secondary': theme('colors.gray.600'),
          '--success': theme('colors.green.500'),
          '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        // Dark theme overrides when data-theme="dark" is present
        '.dark, [data-theme="dark"]': {
          '--background': theme('colors.gray.900'),
          '--card-bg': theme('colors.gray.800'),
          '--text': theme('colors.gray.100'),
          '--text-secondary': theme('colors.gray.400'),
          '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        },
      });
    },
  ],
}