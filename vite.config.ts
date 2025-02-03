

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '146.83.129.107',
    port: 80,
    allowedHosts: ['dismet.ucn.cl'],
    proxy: {
      '/api': {
        target: 'https://www.ceazamet.cl',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  }
})