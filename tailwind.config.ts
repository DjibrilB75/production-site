import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sand: {
          50: '#FDFBF7',
          100: '#F9F3E9',
          200: '#F1E4CE',
          300: '#E6D2AE',
          400: '#D9BC87',
          500: '#C9A468',
          600: '#B08A4E',
          700: '#8C6D3D',
          800: '#6B5230',
          900: '#4A3820',
        },
        terracotta: {
          50: '#FBEEE9',
          100: '#F3D5C7',
          200: '#E6B39A',
          300: '#D6906C',
          400: '#C2724B',
          500: '#B0603D',
          600: '#954E31',
          700: '#753D26',
          800: '#552C1B',
          900: '#3A1E12',
        },
        clay: {
          400: '#A67560',
          500: '#8C5C48',
          600: '#6F4636',
        },
        dune: {
          50: '#FAF7F2',
          100: '#F3ECE0',
          200: '#E9DCC8',
        },
        night: {
          800: '#2B241C',
          900: '#1E1912',
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        drift: 'drift 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'desert-gradient': 'linear-gradient(180deg, #FDFBF7 0%, #F3ECE0 55%, #E9DCC8 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #F3D5C7 0%, #E6B39A 45%, #C2724B 100%)',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(139, 108, 66, 0.12)',
        card: '0 4px 24px rgba(107, 82, 48, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
