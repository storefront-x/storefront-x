# PWA

Storefront X supports PWA functionalities via the [Vite Plugin PWA](https://vite-plugin-pwa.netlify.app). Unfortunately, because Vite plugins can't be overridden, PWA installation requires a few steps instead of just enabling one Storefront X module.

## Installation

### 1. Install Vite Plugin PWA

Install the [Vite Plugin PWA](https://vite-plugin-pwa.netlify.app) in module representing your instance/implementation. As an example, we will use the `demo-shopware` module.

```
cd modules/demo-shopware
yarn add vite-plugin-pwa
```

### 2. Add Vite Plugin PWA to Vite config

If your module doesn't have `vite.config.js`, create it.

> `modules/demo-shopware/vite.config.js`

```js
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      // Workbox is a service worker library that will help use
      // easily configure a service worker
      workbox: {
        // List of types of static assets we want to cache
        globPatterns: ['**/*.{js,css,ico,svg,png}'],
        // Because Storefront X isn't SPA,
        // we don't want navigation fallback to index.html
        navigateFallback: null,
        // Here set all runtime caching for dynamic routes
        // like image resizer or server proxy
        runtimeCaching: [
          {
            urlPattern: /\/_i\//,
            handler: 'CacheFirst',
          },
          {
            urlPattern: /\/_magento\//,
            handler: 'NetworkFirst',
          },
        ],
      },
      // Configure your manifest
      manifest: {
        start_url: '/',
        name: 'Storefront X',
        short_name: 'Storefront X',
        description: 'Storefront X with Shopware integration',
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
```

### 3. Add images

Add images specified in manifest to the public directory inside your module.

### 4. Override index.html

Because Vite Plugin PWA doesn't inject everything required into the `index.html`, we need to override it and add it manually.

We will be adding an `apple-touch-icon` link and a `theme-color` meta tag.

> `modules/demo-shopware/base/templates/index.html`

```html{10,11}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="theme-color" content="#FB923C" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/entry.client.ts"></script>
  </body>
</html>
```
