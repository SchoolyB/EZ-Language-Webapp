// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://schoolyb.github.io',
  base: '/EZ-Language-Webapp/',
  redirects: {
    '/playground': '/',
    '/playground/': '/',
  },
  markdown: {
    syntaxHighlight: false, // Disable Shiki - we handle EZ highlighting ourselves
  },
  vite: {
    plugins: [tailwindcss()]
  }
});