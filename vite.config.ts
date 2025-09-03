import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Roleta de Prêmios',
        short_name: 'PrizeRoulette',
        description: 'Uma roleta de prêmios interativa e divertida!',
        theme_color: '#7c3aed',
        background_color: '#f9fafb',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'bundle-analyzer-report.html',
    }),
  ].filter(Boolean),
  
  // Configurações de build
  build: {
    sourcemap: mode !== 'production',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['canvas-confetti'],
        },
      },
    },
  },
  
  // Otimizações
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Configurações do servidor de desenvolvimento
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
  },
  
  // Configurações de preview
  preview: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Aliases para importações
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}));
