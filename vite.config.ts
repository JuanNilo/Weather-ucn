

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//Cambiando algo
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '146.83.129.107',
    port: 80,
    allowedHosts: ['dismet.ucn.cl'],
    https: {
      //@ts-ignore
      key: "/Users/juannilo/Downloads/UCN_2024/KEY/wildcard_ucn_cl.key",
      //@ts-ignore
      cert: "/Users/juannilo/Downloads/UCN_2024/KEY/wildcard_ucn_cl.cert",
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