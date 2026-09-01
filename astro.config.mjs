import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goldenpillar.om',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-OM', ar: 'ar-OM' },
      },
      // Exclude the root language-redirect page and the 404 page — neither
      // is a real destination worth indexing.
      filter: (page) => !page.endsWith('/404') && new URL(page).pathname !== '/',
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
