import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ServerRouter } from 'react-router-dom'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts: true
  }
})
