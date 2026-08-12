// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  // Change this to the production domain before the first deploy.
  site: "https://www.ifield.ae",

  // Every page is prerendered. Only two routes opt out with
  // `prerender = false`: the Keystatic admin UI, and the contact
  // endpoint in phase 9.
  output: "static",

  // Vercel adapter so those two routes render on demand as serverless
  // functions; every other route is prerendered to static HTML.
  adapter: vercel(),

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
