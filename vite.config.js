import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://16.170.225.159:8083'
    },
    port: 5175
  },
  plugins: [react()],
})
