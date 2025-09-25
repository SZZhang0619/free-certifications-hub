import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages 部署時需要設定 base 路徑
  // 如果部署到自訂網域，請將此行註解或設為 '/'
  base: process.env.NODE_ENV === 'production' ? '/free-certifications-hub/' : '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
