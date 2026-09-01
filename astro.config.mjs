import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://goldenpillar.om',
  vite: { plugins: [tailwindcss()] },
});
