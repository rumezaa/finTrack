import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Use named import instead of default import
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json',  // Path to the manifest.json
          dest: '',                   // Copy to the root of the dist folder
        },
      ],
    }),
  ],
})
