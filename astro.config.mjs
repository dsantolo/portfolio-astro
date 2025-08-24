// @ts-check
import { defineConfig } from 'astro/config';
import { themeConfig } from './src/config';
import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,

  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [svelte()],
  adapter: vercel()
});