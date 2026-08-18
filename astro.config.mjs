import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://getclockdapp.com',
  compressHTML: true,
  integrations: [
    sitemap({
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url.endsWith('getclockdapp.com')) {
          return { ...item, changefreq: 'weekly', priority: 1 };
        }
        if (url.endsWith('/privacy') || url.endsWith('/terms')) {
          return { ...item, changefreq: 'monthly', priority: 0.3 };
        }
        return { ...item, changefreq: 'weekly', priority: 0.7 };
      },
    }),
  ],
});
