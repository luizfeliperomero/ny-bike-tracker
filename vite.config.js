import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
      port: 3000,
      proxy: {
	  "/api": {
	      target: "https://mds.bird.co/gbfs/v2/public/new-york/free_bike_status.json" ,
	      changeOrigin: true,
	      rewrite: (path) => path.replace(/^\/api/, '')
	  }
      }
  }
})
