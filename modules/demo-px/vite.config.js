import { defineConfig } from 'vite'
import tailwind from 'tailwindcss'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindConfig from './tailwind.config.js'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind({ config: tailwindConfig })],
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      workbox: {
        globPatterns: ['**/*.{js,css,ico,svg,png}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /_i/,
            handler: 'CacheFirst',
          },
          {
            urlPattern: /_magento/,
            handler: 'NetworkFirst',
          },
        ],
      },
      manifest: {
        start_url: '/',
        name: 'Storefront X',
        short_name: 'Storefront X',
        description: 'Storefront X with Magento integration',
        theme_color: '#FB923C',
        icons: [
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
