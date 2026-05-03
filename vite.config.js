import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
       
        main: resolve(__dirname, 'index.html'),
        spa: resolve(__dirname, 'spa.html'),
        react: resolve(__dirname, 'react.html'),
        javascript: resolve(__dirname, 'javascript.html'),
        axios: resolve(__dirname, 'axios.html'),
        fetchapi: resolve(__dirname, 'fetchapi.html'),
        oojs: resolve(__dirname, 'oojs.html'),
      }
    }
  }
})