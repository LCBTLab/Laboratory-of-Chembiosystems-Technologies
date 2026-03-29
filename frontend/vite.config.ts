import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.REACT_APP_BACKEND_URL || 'http://localhost:8001',
          changeOrigin: true,
        },
      },
    },
    define: {
      'import.meta.env.VITE_REACT_APP_BACKEND_URL': JSON.stringify(env.REACT_APP_BACKEND_URL || 'http://localhost:8001'),
    },
  };
});
