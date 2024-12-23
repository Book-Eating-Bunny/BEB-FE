import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), process.env.NODE_ENV === 'production' ? null : eslint()],
  base: '/', // 루트 경로 (기본값)
  server: {
    proxy: {
      '/api': {
        target: 'http://223.130.134.62',
        changeOrigin: true
      }
    }
  }
});
