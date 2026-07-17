import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        pay: resolve(__dirname, 'pay.html'),
        reach: resolve(__dirname, 'reach.html'),
        admin: resolve(__dirname, 'admin.html'),
        adminDashboard: resolve(__dirname, 'admin-dashboard.html')
      }
    }
  }
});
