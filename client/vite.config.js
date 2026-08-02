import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  test: {
    globals: true,
    environment: 'jsdom', // ให้ Vitest จำลองสิ่งแวดล้อมเหมือนรันบน Web Browser
  },
})