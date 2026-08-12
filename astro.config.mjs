// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  // Change this to the production domain before the first deploy.
  site: "https://www.ifield.ae",

  // Every page is prerendered. Only two routes opt out with
  // `prerender = false`: the Keystatic admin UI, and the contact
  // endpoint in phase 9.
  output: "static",

  // Node adapter so those two routes can render on demand. Swap for
  // @astrojs/netlify or @astrojs/vercel at deploy time — the rest of
  // the config is host-agnostic.
  adapter: node({ mode: "standalone" }),

  integrations: [react(), markdoc(), keystatic()],

  build: {
    // Emit /capabilities/index.html so URLs have no trailing-slash
    // ambiguity across hosts.
    format: "directory",
  },

  devToolbar: {
    enabled: false,
  },
});
