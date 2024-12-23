import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // URL de tu backend
        changeOrigin: true, // Cambia el origen a coincidir con el backend
        secure: false, // Si usas HTTPS, deshabilitar la validación
      },
    },
  },
})


