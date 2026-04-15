// @ts-check
import { defineConfig } from 'astro/config'; // Déprécié

// https://astro.build/config
export default defineConfig({
   site: 'https://www.hokoha.com', 

   base: process.env.GITHUB_ACTIONS ? '/site-hokoha/' : '/', // /site-hokoha/ uniquement sur GitHub Pages, '/' en local et en production
   output: 'static',     // Production en mode site statique

   devToolbar: {
      enabled: false
   }
});
