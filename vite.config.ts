

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '146.83.129.107',
    port: 80,
    allowedHosts: ['dismet.ucn.cl'],
    https: {
      key: fs.readFileSync(process.env.KEY_PATH || 'default/path/to/key.pem'),
      cert: fs.readFileSync(process.env.TZ || 'C:/Users/Usuario/Desktop/ucn-iot/ucn-iot.crt')
    },
    proxy: {
      '/api': {
        target: 'https://www.ceazamet.cl',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  }
})