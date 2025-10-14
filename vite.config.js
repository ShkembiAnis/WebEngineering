import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  esbuild: {
    target: 'es2020'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

