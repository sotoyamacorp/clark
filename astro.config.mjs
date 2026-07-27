// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ph.sotoyamacorp.com',

  integrations: [mdx(), sitemap(), preact()],

  vite: {
    plugins: [tailwindcss()]
  }
});