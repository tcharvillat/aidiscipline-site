// tailwind.config.mjs
// Configuration Tailwind v4 pour AI Discipline
// IMPORTANT : les couleurs ci-dessous sont des estimations basées sur les visuels du site Wix.
// À CONFIRMER en pixel-pickant le site actuel via DevTools Chrome avant de figer ces valeurs.

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Violet/Mauve principal — couleur dominante de la marque
          50:  '#F4F1FF',
          100: '#E8E2FF',
          200: '#D1C2FF',
          300: '#B19BFF',
          400: '#8B6EFF',
          500: '#6B4EFF',  // ← couleur principale (à valider)
          600: '#5638E5',
          700: '#4A2FE5',
          800: '#3A22B8',
          900: '#2A1A8A',
        },
        ink: {
          DEFAULT: '#0F0F1A',
          muted:   '#4A4A5C',
          light:   '#8A8A9E',
        },
        surface: {
          DEFAULT:   '#FFFFFF',
          secondary: '#F7F5FF',
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
