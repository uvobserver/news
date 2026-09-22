import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Canonical URLs, Open Graph images and the sitemap are built against this.
  site: 'https://www.uvobserver.com',
  trailingSlash: 'ignore',
  integrations: [react(), sitemap()],
});
