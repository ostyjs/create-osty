import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-stuff': ['react', 'react-dom', 'react-router-dom'],
          'nostr-dev-kit': ['@nostr-dev-kit/ndk', '@nostr-dev-kit/ndk-cache-dexie'],
          zustand: ['zustand'],
        },
      },
    },
  },
});
