import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        popup: "main.html",   // React UI popup
        content: "src/content.ts", // Content script (NO .tsx)
        isolated: "src/insolated.tsx"
      },
      output: {
        format: "iife"
      }
    }
  }
});
