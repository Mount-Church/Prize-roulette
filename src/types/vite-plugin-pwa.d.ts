/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Extend the Window interface to include the workbox property
declare interface Window {
  workbox: {
    register: () => Promise<void>;
  };
}

// Extend the ServiceWorkerRegistration interface to include the update method
declare interface ServiceWorkerRegistration {
  update: () => Promise<void>;
}

// Extend the Navigator interface to include the serviceWorker property
declare interface Navigator {
  serviceWorker: {
    ready: Promise<ServiceWorkerRegistration>;
  };
}

// Add type definitions for Vite's import.meta.env
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BUILD_TIME: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add type definitions for Vite PWA plugin
interface VitePWAOptions {
  registerType?: 'autoUpdate' | 'prompt' | 'auto';
  includeAssets?: string | string[];
  manifest?: {
    name: string;
    short_name: string;
    description: string;
    theme_color: string;
    background_color: string;
    display: string;
    start_url: string;
    icons: Array<{
      src: string;
      sizes: string;
      type: string;
      purpose?: string;
    }>;
  };
  workbox?: {
    sourcemap?: boolean;
    cleanupOutdatedCaches?: boolean;
    clientsClaim?: boolean;
    skipWaiting?: boolean;
    runtimeCaching?: Array<{
      urlPattern: RegExp | string;
      handler: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate';
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
        };
        cacheableResponse?: {
          statuses?: number[];
          headers?: Record<string, string>;
        };
      };
    }>;
  };
  devOptions?: {
    enabled?: boolean;
    type?: 'module' | 'classic';
    navigateFallback?: string;
    suppressWarnings?: boolean;
  };
}
