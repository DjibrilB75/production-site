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
        // Cormorant Garamond – luxury serif headlines
        display: ['Cormorant Garamond', 'var(--font-cormorant)', 'Georgia', 'serif'],
        // DM Sans – clean modern body text
        sans: ['DM Sans', 'var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        // Cinzel – elegant small-caps labels
        accent: ['Cinzel', 'var(--font-cinzel)', 'Georgia', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ── Gold luxury palette ──
        gold: {
          50:  '#fdf8ec',
          100: '#f9edca',
          200: '#f2d98f',
          300: '#e8c26a',
          400: '#d4aa46',
          500: '#C9A84C',
          600: '#a8882e',
          700: '#7e641f',
          800: '#554214',
          900: '#2e230a',
        },

        // Rose romantic accent
        rose: {
          300: '#f0b8c8',
          400: '#e8a0b4',
          500: '#C2809A',
        },

        champagne: '#F7EDD0',

        // Holographic – kept for existing components
        holographic: {
          from: '#667eea',
          via1: '#764ba2',
          via2: '#f093fb',
          via3: '#4facfe',
          to:   '#00f2fe',
        },

        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#252530',
        },
      },
      animation: {
        'gold-shimmer': 'goldShimmer 5s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'pulse-glow':   'pulse-glow 2s ease-in-out infinite',
        'gradient-x':   'gradient-x 15s ease infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'liquid-flow':  'liquid-flow 8s ease-in-out infinite',
        'fade-in-up':   'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        goldShimmer: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'liquid-flow': {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg)',
          },
          '50%': {
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'rotate(180deg)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(201, 168, 76, 0.7)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%':      { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient':   'linear-gradient(135deg, #C9A84C 0%, #FFD166 40%, #C9A84C 70%, #a8882e 100%)',
        'dark-gradient':   'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
        'holographic':     'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
