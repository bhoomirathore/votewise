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
        saffron: '#FF9933',
        'saffron-dark': '#E6872A',
        'saffron-light': '#FFF3E0',
        'saffron-pale': '#FAFAF8',
        'india-green': '#138808',
        eci: {
          blue: '#1A73E8',
          'blue-dark': '#1557b0',
          'blue-light': '#4a9af5',
          'blue-glow': 'rgba(26,115,232,0.25)',
        },
        surface: {
          light: '#FAFAF8',
          dark: '#1A1208',
        },
        card: {
          light: '#FFFFFF',
          dark: '#2D1F0A',
        },
        border: {
          light: '#E8DDD0',
          dark: '#3D2E18',
        },
        text: {
          primary: '#1A0F00',
          secondary: '#6B5744',
          'primary-dark': '#F5EDE0',
          'secondary-dark': '#B8956A',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,153,51,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255,153,51,0)' },
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
        'hero-gradient-light': 'linear-gradient(135deg, #FFF8F0 0%, #FAFAF8 40%, #FFF3E0 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #1A1208 0%, #2D1F0A 40%, #1A1208 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,153,51,0.06) 0%, rgba(255,153,51,0.01) 100%)',
      },
    },
  },
  plugins: [],
}
