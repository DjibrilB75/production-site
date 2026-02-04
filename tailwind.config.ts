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
        display: ['var(--font-sora)', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui'],
        accent: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        holographic: {
          from: '#667eea',
          via1: '#764ba2',
          via2: '#f093fb',
          via3: '#4facfe',
          to: '#00f2fe',
        },
        neon: {
          pink: '#FF6B9D',
          cyan: '#00D9FF',
          yellow: '#F8B500',
        },
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#252530',
        },
      },
      animation: {
        'liquid-flow': 'liquid-flow 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
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
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
            opacity: '1',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)',
            opacity: '0.8',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'holographic': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
