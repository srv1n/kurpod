import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import tsconfigPaths from 'vite-tsconfig-paths'

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  clearScreen: false,
  server: {
    host: host || '0.0.0.0', // Allow external connections for iOS simulator
    port: 1421,
    strictPort: true,
    hmr: host
      ? {
        protocol: 'ws',
        host: host,
        port: 1430,
      }
      : {
        protocol: 'ws',
        host: '0.0.0.0', // Allow external HMR connections
        port: 1430,
      },
  },
  // Ensure proper asset serving for mobile
  build: {
    target: 'esnext',
    minify: false,
  },
});