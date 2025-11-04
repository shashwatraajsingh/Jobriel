/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxe Mist - Soft Minimal Elegant Theme
        luxe: {
          bg: '#F8F8FB',           // Almost white background
          card: '#FFFFFF',         // Pure white for cards
          section: '#E5E1FA',      // Light pastel violet for sections
          border: '#E5E5E8',       // Subtle border
        },
        violet: {
          DEFAULT: '#6A4DFF',      // Rich lavender primary
          light: '#9D7BFF',        // Light lavender
          pale: '#E5E1FA',         // Pale violet
          hover: '#5A3DEF',        // Darker on hover
          glow: 'rgba(106, 77, 255, 0.15)', // Soft glow
        },
        text: {
          heading: '#1A1A1A',      // Dark heading
          body: '#555555',         // Gray subtext
          muted: '#888888',        // Muted text
        },
        // Keep neutrals for flexibility
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0E0E10',  // Match midnight bg
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-satoshi)', 'DM Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'large': '2rem',
        'xl2': '1.5rem',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' },
          to: { boxShadow: '0 0 30px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(106, 77, 255, 0.08)',
        'soft-md': '0 4px 16px rgba(106, 77, 255, 0.12)',
        'soft-lg': '0 8px 32px rgba(106, 77, 255, 0.15)',
        'soft-xl': '0 12px 48px rgba(106, 77, 255, 0.18)',
        'violet-glow': '0 0 20px rgba(106, 77, 255, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 20px rgba(106, 77, 255, 0.15)',
      },
    },
  },
  plugins: [],
}
