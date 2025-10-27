import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Optional build-time optimizations: image minification and compressed assets
// These plugins are only loaded in production mode to keep dev fast.
import viteImagemin from 'vite-plugin-imagemin'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === 'production'
      ? [
          // Minify/optimize images during build
          viteImagemin({
            gifsicle: { optimizationLevel: 3, interlaced: false },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { progressive: true, quality: 75 },
            pngquant: { quality: [0.65, 0.8], speed: 4 },
            svgo: { plugins: [{ removeViewBox: false }] },
          }),
          // Emit compressed assets (gz and brotli) for static hosting
          viteCompression({ algorithm: 'gzip', ext: '.gz' }),
          viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
        ]
      : []),
  ],
  base: '/tilahun-portfolio/',
}))
