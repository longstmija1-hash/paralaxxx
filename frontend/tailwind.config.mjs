/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00ff87',
          purple: '#bf5af2',
          blue: '#0a84ff',
          red: '#ff453a',
          yellow: '#ffd60a',
        },
        dark: {
          950: '#020204',
          900: '#050508',
          800: '#0d0d14',
          700: '#12121e',
          600: '#1a1a2e',
          500: '#22223d',
          400: '#2e2e50',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.5s linear',
        'heart-break': 'heart-break 0.6s ease-out forwards',
        'coin-pop': 'coin-pop 0.4s ease-out forwards',
        'scanline': 'scanline 8s linear infinite',
        'ticker': 'ticker 20s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 5px #00ff87, 0 0 10px #00ff87, 0 0 20px #00ff87' },
          '50%': { boxShadow: '0 0 10px #00ff87, 0 0 25px #00ff87, 0 0 50px #00ff87' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'heart-break': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '30%': { transform: 'scale(1.3)', opacity: 1 },
          '60%': { transform: 'scale(0.8) rotate(-10deg)', opacity: 0.7 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1, filter: 'grayscale(1)' },
        },
        'coin-pop': {
          '0%': { transform: 'scale(0) translateY(0)', opacity: 1 },
          '70%': { transform: 'scale(1.2) translateY(-20px)', opacity: 1 },
          '100%': { transform: 'scale(1) translateY(-30px)', opacity: 0 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'cyber-grid': `
          linear-gradient(rgba(0,255,135,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,135,0.05) 1px, transparent 1px)
        `,
        'neon-glow': 'radial-gradient(ellipse at center, rgba(0,255,135,0.15) 0%, transparent 70%)',
        'purple-glow': 'radial-gradient(ellipse at center, rgba(191,90,242,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
