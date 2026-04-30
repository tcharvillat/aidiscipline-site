// tailwind.config.mjs
// Configuration Tailwind v4 pour AI Discipline
// Palette de marque : rose/fuchsia centré sur #FC037E (hue 330, saturation ~98%).

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Rose/Fuchsia — couleur dominante de la marque
          50:  '#FFF0F8',
          100: '#FFD6EA',
          200: '#FEB1D7',
          300: '#FE80BC',
          400: '#FE45A0',
          500: '#FC037E', // ← couleur principale (logo, CTA)
          600: '#DA026B',
          700: '#B10257',
          800: '#880143',
          900: '#5F002F',
        },
        ink: {
          DEFAULT: '#0F0F1A',
          muted:   '#4A4A5C',
          light:   '#8A8A9E',
        },
        surface: {
          DEFAULT:   '#FFFFFF',
          secondary: '#FFF0F8', // wash rose très léger pour fonds de section
          dark:      '#0F0F1A',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Échelle responsive pour titres
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)',   { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)',     { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2rem)',   { lineHeight: '1.2', fontWeight: '600' }],
      },
      borderRadius: {
        // Boutons pill-shaped sur le site actuel
        'pill': '9999px',
      },
      boxShadow: {
        'card':       '0 4px 16px rgba(15, 15, 26, 0.06)',
        'card-hover': '0 8px 32px rgba(15, 15, 26, 0.12)',
      },
      animation: {
        'scroll-x': 'scroll-x 40s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
