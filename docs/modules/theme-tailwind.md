# Theme Tailwind

> `@storefront-x/theme-tailwind`

Module providing set of components written in Tailwind, which can be used as basis for your store.

This theme is specially designed to be extremely flexible and fast at creating new and unique designs. Thanks to [Tailwind](https://tailwindcss.com) and Storefront X modules, you can easily change colors, spacing, fonts and other global configurations or completely override some components.

By itself, this theme doesn't provide any pages. Instead, pages should be supplied by your implementation theme package, because every application might want different pages.

## `CONTACT_EMAIL` config

Contains contact email displayed in the header.

```ts
// config/CONTACT_EMAIL.ts

export default 'info@storefrontx.io'
```

## `CONTACT_TELEPHONE` config

Contains contact telephone number displayed in the header.

```ts
// config/CONTACT_TELEPHONE.ts

export default '+420 725 562 510'
```

## `pageViewLabel` event

Prepared event for labeling the page. More about events and listeners [here](/advanced/event-bus.html).

### Properties

- `label: string` - label of page

### Example

```vue
<!-- pages/index.vue -->

<template>
  <Heading>Homepage</Heading>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.HOMEPAGE)
})
</script>
```

## `PAGE_LABELS` config

Together with `pageViewLabel` event you can use default labels config for diferent page types imported from module `@storefront-x/theme-tailwind-magento-px`.

```ts
// config/PAGE_LABELS.ts

export default {
  HOMEPAGE: 'home-page',
  PRODUCT: 'product-detail-page',
  CATEGORY: 'category-detail-page',
  CMS_PAGE: 'cms-page',
  AMASTY_BRAND: 'brand-detail-page',
  AMASTY_BLOG_POST: 'blog-post-detail-page',
  AMASTY_BLOG_CATEGORY: 'blog-category-detail-page',
  WISHLIST: 'wishlist-page',
  CHECKOUT: 'checkout-page',
  ACCOUNT: 'account-page',
  SIGN_IN: 'sign-in-page',
  SIGN_UP: 'sign-up-page',
  SEARCH: 'search-page',
  RESET_PASSWORD: 'reset-password-page',
}
```
