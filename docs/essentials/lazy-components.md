# Lazy components

Using lazy components is necessary to achieve top performance. There are two kinds: lazy loaded and lazy hydrated components.

## Lazy loading

Lazy loading is for components that are initially not visible and are made to be visible only after some condition and/or user action. Imagine hamburger menu, modals and similar.

In Vue, such components should be behind `v-if` and imported using `defineAsyncComponent`.

### Example

```vue
<template>
  <HamburgerMenu v-if="isOpen" />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const HamburgerMenu = defineAsyncComponent(() => import('#ioc/components/HamburgerMenu'))

defineProps({
  isOpen: Boolean,
})
</script>
```

## Lazy hydration

Lazy hydration is for components that need to be visible during the initial render, but execution of their logic (mounted, ...) can be delayed to some later time (e.g. when the component is visible).

In Vue, such components are imported using special [hydration utils](/modules/vue#hydratewhenidle-utils-hydration)

### Example

```vue
<template>
  <Header />
  <Footer />
</template>

<script setup>
import hydrateWhenIdle from '#ioc/utils/hydrateWhenIdle'
import hydrateWhenVisible from '#ioc/utils/hydrateWhenVisible'

const Header = hydrateWhenIdle(() => import('#ioc/components/Header'))
const Footer = hydrateWhenVisible(() => import('#ioc/components/Footer'))
</script>
```
