/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'piba-gold': '#D4AF37',
        'piba-gold-light': '#F4E5C2',
        'piba-gold-dark': '#B8941F',
        'piba-black': '#0A0A0A',
        'piba-gray': '#1A1A1A',
        'piba-gray-light': '#F5F5F5',
        'border-gray-200': '#E5E7EB',
        'primary-bg': '#0F0F0F',
        'secondary-bg': '#1A1A1A',
        'accent-gold': '#D4AF37',
        'soft-gold': '#F4E5C2',
        'text-white': '#FFFFFF',
        'muted-text': '#B0B0B0',
        'luxury-cream': '#FAF7F2',
        'card-bg': 'rgba(255, 255, 255, 0.06)',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
