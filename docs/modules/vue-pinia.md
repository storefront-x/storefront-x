# Vue Pinia

> `@storefront-x/vue-pinia`

Wrapper around the [Pinia](https://pinia.vuejs.org) library. Adds server -> client data transfer and special action executed at the beginning of every server request.

## `stores/` IoC concept

Files exporting Pinia stores. These stores can be imported via IoC.

### `serverInit` & `clientInit`

Pinia stores in SFX support something called `serverInit` and `clientInit`. They are special files exporting a function which runs during server/client initialization and are very useful for initialization of store data. To create file with this special action, create a file containing `.serverInit` or `.clientInit` suffix.

All `serverInit` & `clientInit` actions in all stores are executed in parallel, so they are great fit for fetching global data (customer, cart, etc.). In addition, `serverInit` actions are never shipped to the client, thus decreasing the bundle size.

These actions do not have any real relation to their corresponding stores. So technically, you can import/use/modify any store in them.

### Example

```ts
// stores/useAwesomeStore.ts

import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('awesome', {
  state: () => ({
    title: '',
  }),
})
```

```ts
// stores/useAwesomeStore.serverInit.ts

import useAwesomeStore from '#ioc/stores/useAwesomeStore'

export default async () => {
  const awesomeStore = useAwesomeStore()

  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const todo = await response.json()

  awesomeStore.$patch({ title: todo.title })
}
```

```vue
<template>
  <h1>{{ awesomeStore.title }}</h1>
</template>

<script setup lang="ts">
import useAwesomeStore from '#ioc/stores/useAwesomeStore'

const awesomeStore = useAwesomeStore()
</script>
```
