// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.aidiscipline.com',
  integrations: [
    sitemap({
      // Page sandbox interne : exclue du sitemap (et en noindex).
      filter: (page) => !page.includes('/test-design'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
