import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  server: { host: true, port: 4321 },
  output: 'static',
  integrations: [tailwind()],
});

