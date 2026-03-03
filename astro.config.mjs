// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts/meta";
import robotsTxt from "astro-robots-txt";
import favicons from "astro-favicons";

import { remarkReadingTime } from "./src/helpers/remarkReadingTime.mjs";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react(), mdx(), robotsTxt(), sitemap(), favicons()],
  experimental: {
    // responsiveImages: true,
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
