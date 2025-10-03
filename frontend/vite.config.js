import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  
  // This is the new block you need to add
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your backend server URL
        secure: false,
        changeOrigin: true,
      },
    },
  },
  
  // Your existing plugins
  plugins: [react(), tailwindcss()],
  
  // Your existing path alias (best practice is to put it inside 'resolve')
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})