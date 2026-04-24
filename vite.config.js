import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        catalogo: resolve(__dirname, 'catalogo.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        contacto: resolve(__dirname, 'contacto.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
