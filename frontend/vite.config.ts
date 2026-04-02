import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_REACT_APP_BACKEND_URL || env.REACT_APP_BACKEND_URL;
  
  if (!backendUrl) {
    console.warn('Warning: VITE_REACT_APP_BACKEND_URL environment variable is not set');
  }
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: backendUrl ? {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      } : undefined,
    },
    define: {
      'import.meta.env.VITE_REACT_APP_BACKEND_URL': JSON.stringify(backendUrl),
    },
  };
});
