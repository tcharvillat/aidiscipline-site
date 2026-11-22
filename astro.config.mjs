// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.aidiscipline.com',
  integrations: [
    sitemap({
      // Pages internes ou pas encore publiées : exclues du sitemap (et en noindex).
      filter: (page) =>
        !page.includes('/test-design') &&
        !page.includes('/maquettes/') &&
        !page.includes('/formation-ia/focused') &&
        !page.includes('/formation-ia/outiller-cas-usage-marketing'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
