import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Relative base on build so the site works at the domain root (Netlify /
// custom domain) AND on a GitHub Pages subpath (/<repo>/). Dev stays at '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
          smooth: ['lenis'],
        },
      },
    },
  },
}))
