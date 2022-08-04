# Vue Head

> `@storefront-x/vue-head`

Wrapper module around the [@vueuse/head](https://github.com/vueuse/head) library. It adds server side rendering and IoC integration.

## `useHead` composable

Wrapper around the `useHead` composable.

:::tip
Use the IoC version instead of direct import from the `@vueuse/head` library for better decoupling.
:::

### Example

```vue
<template>
  <h1>Hello, World!</h1>
</template>

<script setup lang="ts">
import useHead from '#ioc/composables/useHead'

useHead({
  title: 'Hello, World!',
})
</script>
```
