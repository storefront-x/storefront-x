# Vue Pinia

> `@storefront-x/vue-pinia`

Wrapper around the [Pinia](https://pinia.vuejs.org) library. Adds server -> client data transfer and special action executed at the beginning of every server request.

## `stores/` IoC concept

Files exporting Pinia stores. These stores can be imported via IoC and are enhanced by the special `serverInit` action that is executed the beginning of every server request.

### `serverInit`

All `serverInit` actions in all stores are executed in parallel so they are great fit for fetching global data (customer, cart, ...). It's a good idea to guard them with `IS_SERVER` config to improve tree-shaking.

### Example

```ts
// stores/useAwesomeStore.ts

import IS_CLIENT from '#ioc/config/IS_CLIENT'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('awesome', {
  state: () => ({
    title: '',
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const todo = await response.json()

      this.$patch({ title: todo.title })
    },
  },
})
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
