# Vue - `@storefront-x/vue`

Framework module enabling usage of [Vue.js](https://vuejs.org) in the application.

## `assets/` IoC concept

Concept for static assets (CSS, images, ...) that will be build into the application instead of being served via the `public/` concept.

### Advantages over the `public/` concept

1. Assets are hashed during build so when their content changes, they are automatically [cache-busted](https://support.stackpath.com/hc/en-us/articles/360001224166-Cache-Busting-Explained).
2. Some assets (mainly CSS) might be preloaded in the HTML output, thus increasing performance of the application.

### Example

```css
/* assets/style.css */

header {
  background-color: red;
}
```

```html
<!-- assets/icon.svg -->

<svg>
  <!-- some content -->
</svg>
```

```vue
<!-- components/Header.vue -->

<template>
  <img :src="icon" />
</template>

<script setup lang="ts">
import icon from '#ioc/assets/icon'
import '#ioc/assets/style'
</script>
```

## `components/` IoC concept

IoC concept for Vue [components](https://vuejs.org/guide/essentials/component-basics.html).

### Example

```vue
<!-- components/Heading.vue -->

<template>
  <h1><slot /></h1>
</template>
```

```vue
<!-- components/BlogPost.vue -->

<template>
  <Heading>Test blog post</Heading>
</template>

<script setup lang="ts">
import Heading from '#ioc/components/Heading'
</script>
```

## `composables/` IoC concept

IoC concept for Vue [composables](https://vuejs.org/guide/reusability/composables.html).

### Example

```ts
// composables/useCount.ts

import { ref, computed } from 'vue'

export default () => {
  const state = ref(0)

  const count = computed(() => state.value)

  const increment = () => {
    state.value++
  }

  return {
    count,
    increment,
  }
}
```

```vue
<!-- components/Counter.vue -->

<template>
  <div>{{ count }}</div>
  <button @click="increment">Increment</div>
</template>

<script setup lang="ts">
import useCount from '#ioc/composables/useCount'

const { count, increment } = useCount()
</script>
```

## `directives/` IoC concept

IoC concept for Vue [directives](https://vuejs.org/guide/extras/render-function.html#custom-directives).

### Example

```js
// directives/vClickOutside.js

export default {
  mounted(el, binding) {
    const handler = (event) => {
      if (el === event.target) return
      if (el.contains(event.target)) return

      binding.value(event)
    }

    el.__vueClickOutsideHandler__ = handler

    document.addEventListener('click', handler)
  },

  unmounted(el) {
    document.removeEventListener('click', el.__vueClickOutsideHandler__)
  },
}
```

```vue
<!-- components/Button.vue -->

<template>
  <button v-click-outside="onClickOutside" @click="onClick">Click me!</button>
</template>

<script setup>
import vClickOutside from '#ioc/directives/vClickOutside'

const onClickOutside = () => alert('You missed!')

const onClick = () => alert('Nice!')
</script>
```

## `mixins/` IoC concept

IoC concept for Vue [mixins](https://vuejs.org/api/options-composition.html#mixins).

:::warning
In Vue 3, mixins are no longer recommended and composables should be used instead.
:::

## `vue/plugins/` concept

:::warning
Advanced concept!
:::

Files exporting async function which accepts freshly created instance of the Vue application. They can be used to extend or add global functionality (router, global store, ...) to the Vue application. Second argument is the application context.

## `vue/providers/` concept

:::warning
Advanced concept!
:::

Global components wrapping the whole application. They can be used to provide global functionality or to fetch global data.

## `useAsyncData` composable

High level composable used for data fetching and transfer of data from server to client. Inspired by `useAsyncData` in [Nuxt 3](https://v3.nuxtjs.org/api/composables/use-async-data/).

### Parameters

- `key: string` - Unique identifier used for transfer of data from server to client.
- `handler: () => Promise<T>` - Async function responsible for fetching (and returning the data).

### Returns

`useAsyncData` returns reactive object containing these fields:

- `data: Ref<T>` - Vue 3 ref containing data returned from the handler
- `pending: Ref<boolean>` - Indicator whether the composable is fetching data.
- `error: Ref<any>` - Contains error thrown by the handler.
- `refresh: () => Promise<void>` - Function that can be used to re-fetch the data.

### Example

```vue
<template>
  <h1>{{ data.title }}</h1>
</template>

<script setup lang="ts">
import useAsyncData from '#ioc/composables/useAsyncData'

const { data } = await useAsyncData('todo', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const todo = await response.json()
  return todo
})
</script>
```

## `useCookies` composable

Wrapper around the [`useCookies`](https://vueuse.org/integrations/usecookies/) composable from the [VueUse](https://vueuse.org) library.

### Example

```vue
<template>
  <h1>{{ cookies.get('msg') }}</h1>
</template>

<script setup lang="ts">
import IS_SEVER from '#ioc/config/IS_SEVER'
import useCookies from '#ioc/composables/useCookies'

const cookies = useCookies()

if (IS_SERVER) {
  cookies.set('msg', 'Hello, World!')
}
</script>
```

## `useContext` composable

:::warning
Advanced composable!
:::

Composable used to get the application context.

## `useState` composable

:::warning
Advanced composable!
:::

Low-level composable used to transfer state from server to client.
