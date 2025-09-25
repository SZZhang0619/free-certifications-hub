import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages 部署時需要設定 base 路徑
  // 如果部署到自訂網域，請將此行註解或設為 '/'
  base: process.env.NODE_ENV === 'production' ? '/free-certifications-hub/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(projectDir, './src')
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 優化建構
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          p5: ['p5']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
