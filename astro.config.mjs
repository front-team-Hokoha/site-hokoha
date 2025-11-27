import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({

  output: 'static',
  base: '/site-hokoha/',  //  nom du dépôt GitHub
  
    
  // Options Astro et Vite par défaut
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      watch: {
        usePolling: true, // option pour garantir le Hot-Reload
      },
    },
  },
});
