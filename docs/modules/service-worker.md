# Service Worker

> `@storefront-x/service-worker`

This module adds service worker to your application. It uses the (Workbox)(https://developer.chrome.com/docs/workbox/) library.

:::warning
Files in the `serviceWorker` are not processed by the Vite toolchain, meaning they have to be pure JavaScript (no TypeScript and no import aliases like `#ioc`).
:::

## Runtime caching

You can set runtime cache (mainly for caching proxy requests) in the `serviceWorker/runtimeCache` concept directory. Each file represents one entry in the [`runtimeCaching`](https://developer.chrome.com/docs/workbox/caching-resources-during-runtime/) array.

### Example:

```js
// modules/magento/serviceWorker/runtimeCache/_magento.js

export default {
  urlPattern: /\/_magento\//,
  handler: 'NetworkFirst',
}
```
