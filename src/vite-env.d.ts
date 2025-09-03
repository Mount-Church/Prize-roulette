/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Type definitions for environment variables
interface ImportMetaEnv {
  // App Info
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BUILD_TIME: string;
  
  // Environment
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly VITE_DEBUG: string;
  
  // API Configuration
  readonly VITE_API_BASE_URL?: string;
  
  // Feature Flags
  readonly VITE_FEATURE_DARK_MODE: string;
  readonly VITE_FEATURE_ANALYTICS: string;
  
  // PWA Configuration
  readonly VITE_PWA_ENABLED: string;
  readonly VITE_PWA_REGISTER_TYPE: string;
  
  // Development Server
  readonly VITE_DEV_SERVER_PORT?: string;
  readonly VITE_DEV_SERVER_OPEN?: string;
  readonly VITE_DEV_SOURCE_MAP?: string;
  
  // Build Settings
  readonly VITE_PUBLIC_PATH?: string;
  readonly VITE_OUTPUT_DIR?: string;
  
  // Analytics
  readonly VITE_GA_TRACKING_ID?: string;
  
  // Error Tracking
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global type declarations
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  import * as React from 'react';
  
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.avif' {
  const value: string;
  export default value;
}
