import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        omOss: path.resolve(__dirname, 'om-oss.html'),
        prosjekter: path.resolve(__dirname, 'prosjekter.html'),
        personvern: path.resolve(__dirname, 'personvern.html'),
        gis: path.resolve(__dirname, 'gis.html'),
        landmaling: path.resolve(__dirname, 'landmaling.html'),
        laserskanning: path.resolve(__dirname, 'laserskanning.html'),
        inspeksjon: path.resolve(__dirname, 'inspeksjon.html'),
        dronekartlegging: path.resolve(__dirname, 'dronekartlegging.html'),
        mobileMapping: path.resolve(__dirname, 'mobile-mapping.html'),
        panorama: path.resolve(__dirname, 'panorama.html'),
        databehandling: path.resolve(__dirname, 'databehandling.html'),
        kontraktsoppfolging: path.resolve(__dirname, 'kontraktsoppfolging.html'),
      }
    }
  }
});