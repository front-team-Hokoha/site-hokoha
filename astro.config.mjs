import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    
// Options Astro et Vite par défaut
  vite: {
    server: {
      watch: {
        usePolling: true, // option pour garantir le Hot-Reload
      },
    },
  },
});
