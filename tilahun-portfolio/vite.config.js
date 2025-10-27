import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Lazy-load optional build-time plugins so local dev and installs don't fail
// if those plugins are not present in node_modules.
export default defineConfig(async ({ mode }) => {
  const plugins = [react()]

  if (mode === 'production') {
    // Try to import image minification plugin if available
    try {
      const { default: viteImagemin } = await import('vite-plugin-imagemin')
      plugins.push(
        viteImagemin({
          gifsicle: { optimizationLevel: 3, interlaced: false },
          optipng: { optimizationLevel: 7 },
          mozjpeg: { progressive: true, quality: 75 },
          pngquant: { quality: [0.65, 0.8], speed: 4 },
          svgo: { plugins: [{ removeViewBox: false }] },
        })
      )
    } catch {
      // optional plugin not installed — continue without it
      console.warn('vite-plugin-imagemin not installed — skipping image minification')
    }

    // Try to import compression plugin if available
    try {
      const { default: viteCompression } = await import('vite-plugin-compression')
      plugins.push(viteCompression({ algorithm: 'gzip', ext: '.gz' }))
      plugins.push(viteCompression({ algorithm: 'brotliCompress', ext: '.br' }))
    } catch {
      console.warn('vite-plugin-compression not installed — skipping asset compression')
    }
  }

  return {
    plugins,
    base: '/tilahun-portfolio/',
  }
})
