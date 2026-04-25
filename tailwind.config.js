/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eci: {
          blue: '#1A73E8',
          'blue-dark': '#1557b0',
          'blue-light': '#4a9af5',
          'blue-glow': 'rgba(26,115,232,0.25)',
        },
        surface: {
          light: '#F8FAFF',
          dark: '#0F1117',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1C2030',
        },
        border: {
          light: '#E2E8F4',
          dark: '#2A3148',
        },
        text: {
          primary: '#1E2A3B',
          secondary: '#5A6478',
          'primary-dark': '#EDF2FF',
          'secondary-dark': '#8B9ABF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(26,115,232,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(26,115,232,0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient-light': 'linear-gradient(135deg, #EEF4FF 0%, #F8FAFF 40%, #E8F0FF 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #0A0E1A 0%, #0F1117 40%, #111827 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(26,115,232,0.08) 0%, rgba(26,115,232,0.02) 100%)',
        'card-gradient-dark': 'linear-gradient(145deg, rgba(26,115,232,0.15) 0%, rgba(26,115,232,0.05) 100%)',
      },
    },
  },
  plugins: [],
}
