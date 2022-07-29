# Vue Router - `@storefront-x/vue-router`

Module providing the application with functionality of the [Vue Router](https://router.vuejs.org) library.

In general, it uses filesystem-based router similar to [Nuxt.js](https://nuxtjs.org) with few exceptions (layouts).

## `pages/` concept

Vue Router collects all components inside `pages/` directories and creates router out of them. Their relative path to the `pages/` directory and filename determines under which URL they will be accessible (with few exceptions).

### Static pages

`pages/index.vue` will be accessible under the root (`/`) URL.

`pages/hello.vue` will be accessible under the `/hello` URL.

`pages/foo/bar.vue` will be accessible under the `/foo/bar` URL.

If none of the pages can be matched, `pages/$404.vue` will be used.

### Dynamic parameters

Pages can define dynamic parts that will be matched as [route parameters](https://router.vuejs.org/guide/essentials/dynamic-matching.html).

`pages/hello/[name].vue` will match `/hello/Pat`, `hello/Mat` and similar URLs.

### Layouts

Layouts are set by adding special `$layout.vue` page. This component will set layout for all pages in the same directory and in all of the children directories unless some directory override it with its own layout.

```
pages/
  $layout.vue # layout A
  index.vue # will use layout A
  category.vue # will use layout A
  checkout/
    $layout.vue # layout B
    index.vue # will use layout B
  account/
    index.vue # will use layout A
    orders.vue # will use layout A
```

## `vueRouter/plugins/` concept

:::warning
Advanced concept!
:::

## `RouterLink` component

Re-exports the [`RouterLink`](https://router.vuejs.org/api/#to) component from the `vue-router` library to be accessible via IoC.

:::tip
The `RouterLink` component is accessible globally without needing to be imported. Importing it over IoC allows for better intellisense support.
:::

### Example

```vue
<template>
  <RouterLink to="/">Home</RouterLink>
</template>

<script setup lang="ts">
import RouterLink from '#ioc/components/RouterLink'
</script>
```

## `SfxRouterOutlet` component

Used in layouts to define where the page should be rendered.

### Example

```vue
<!-- pages/$layout.vue -->

<template>
  <Header />
  <SfxRouterOutlet />
  <Footer />
</template>

<script setup lang="ts">
import SfxRouterOutlet from '#ioc/components/SfxRouterOutlet'
import Header from '#ioc/components/Header'
import Footer from '#ioc/components/Footer'
</script>
```

## `useRoute` composable

Re-exports the [`useRoute`](https://router.vuejs.org/api/index.html#useroute) composable from the `vue-router` library.

:::tip
Use the IoC version instead of direct import from the `vue-router` library for better decoupling.
:::

### Example

```vue
<!-- pages/hello/[name].vue -->

<template>
  <h1>{{ route.params.name }}</h1>
</template>

<script setup lang="ts">
import useRoute from '#ioc/composables/useRoute'

const route = useRoute()
</script>
```

## `useRouter` composable

Re-exports the [`useRouter`](https://router.vuejs.org/api/index.html#userouter) composable from the `vue-router` library.

:::tip
Use the IoC version instead of direct import from the `vue-router` library for better decoupling.
:::

### Example

```vue
<template>
  <button @click="onClick">Go to cart.</button>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'

const router = useRouter()

const onClick = () => {
  router.push('/cart')
}
</script>
```

## `VUE_ROUTER_SCROLL_BEHAVIOR` config

Defines [scroll behavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html) of the router.

### Example

```ts
// config/VUE_ROUTER_SCROLL_BEHAVIOR.ts

import { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.params.savePosition) return
  if (to.hash) return { el: to.hash, behavior: 'smooth' }

  return { top: 0, behavior: 'smooth' }
}

export default scrollBehavior
```
