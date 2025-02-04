

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD
//Cambiando algo
=======
import fs from 'fs'

>>>>>>> parent of 0fef7b5 (FIX?)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '146.83.129.107',
    port: 80,
    allowedHosts: ['dismet.ucn.cl'],
    https: {
      //@ts-ignore
      key: fs.readFileSync(process.env.KEY_PATH),
      //@ts-ignore
      cert: fs.readFileSync(process.env.CERT_PATH)
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