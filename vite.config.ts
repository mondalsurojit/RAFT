/// <reference types="vite-react-ssg" />
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/  +  vite-react-ssg (static prerendering)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Maintainer-facing content (JSON data + blog Markdown) lives at the repo root.
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
  },
  ssgOptions: {
    script: 'async',
    // Emit clean directory URLs: /about/ -> about/index.html
    dirStyle: 'nested',
    // Critical-CSS inlining is handled per-route by beasties (built in).
  },
})
