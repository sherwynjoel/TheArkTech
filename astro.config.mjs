import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless"; // deploy to Vercel

export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(),
  output: 'server', // enables API routes & SSR
  server: { port: 4321 }
});
