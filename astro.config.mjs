import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: netlify(),
  site: 'https://princecollection.com',
  integrations: [mdx(), sitemap(), vue()],
  prefetch: {
    prefetchAll: true
  }
});