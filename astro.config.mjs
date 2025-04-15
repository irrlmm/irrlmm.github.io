// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts/meta";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react(), mdx(), sitemap()],
  experimental: {
    responsiveImages: true,
  },
});
