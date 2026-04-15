// @ts-check
import { defineConfig } from 'astro/config'; // Déprécié

// https://astro.build/config
export default defineConfig({
   site: 'https://www.hokoha.com', 

   base: '/site-hokoha/',  // Le nom du dépôt GitHub
   output: 'static',     // Production en mode site statique

   devToolbar: {
      enabled: false
   }
});
