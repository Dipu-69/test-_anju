import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // required in Codespaces
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // backend inside the same Codespace
        changeOrigin: true,
        secure: false
      }
    }
  }
});