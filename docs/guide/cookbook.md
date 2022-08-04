# Cookbook

## How to create new module

Modules in Storefront X are NPM packages. So they require `package.json` a need to be importable by their identifier. For local development, easiest way is to leverage monorepo functionalities. In root 'package.json', the `workspaces` fields specifies which directories are scanned for NPM packages. By default, it is a `modules` directory.

First, create new directory for the module in the modules directory and add `package.json`.

> `modules/my-module/package.json`

```json
{
  "name": "@vendor/my-module",
  "version": "1.0.0",
  "license": "UNLICENSED",
  "type": "module"
}
```

And second, enable the module in `storefront-x.config.js`.

> `storefront-x.config.js`

```js{9}
export default {
  modules: [
    '@storefront-x/base',

    '@storefront-x/vue',
    '@storefront-x/vue-router',
    // other modules

    '@vendor/my-module',
  ],
}
```

To test that everything works, we can for example add test page to our module.

> `modules/my-module/pages/test.vue`

```vue
<template>
  <h1>Hello from my module!</h1>
</template>
```

After restarting the dev server (`yarn dev`), this page should now be visible under the `/test` URL.

## How to display data from backend

### 1. Create new mapper

We need mapper to sanitize data returned from backend. We also use mappers to provide use with type information.

> `mappers/useToTodo.ts`

```ts
export default () => (data: any) => ({
  id: data.id as number,
  title: data.title as string,
  done: (data.completed ?? false) as boolean,
})
```

:::info
A mapper is higher-order function (function that returns another function), because it is also a composable so it can use other composables in the first function.
:::

### 2. Create new repository

We need repository for communication with backend. In this repository we can use `fetch` method or some adapter (e.g. `useShopware`). In this example, we will display a todo from the [JSON placeholder](https://jsonplaceholder.typicode.com).

> `repositories/useGetTodoRepository.ts`

```ts
import useToTodo from '#ioc/mappers/useToTodo'

export default () => {
  const toTodo = useToTodo()

  return async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    const json = await response.json()
    return toTodo(json)
  }
}
```

### 3. Create new service

Service wraps repository and adds business logic. A lot of the times there might not be additional business logic so services might be basically empty.

> `services/useGetTodo.ts`

```ts
import useGetTodoRepository from '#ioc/repositories/useGetTodoRepository'

export default () => {
  const getTodoRepository = useGetTodoRepository()

  return async (...args: Parameters<typeof getTodoRepository>) => {
    return await getTodoRepository(...args)
  }
}
```

### 4. Fetch data in component

When fetching data that should be rendered on the page, we can't call the service normally. We have to call it inside `useAsyncData` composable. If called on the server during server-side rendering, this composable stores fetched data and transfers them to the browser so that browsers has access to the same data and doesn't have to do any additional requests.

> `pages/todos/[id].vue`

```vue
<template>
  <h1>{{ todo.title }}</h1>
</template>

<script setup lang="ts">
import useRoute from '#ioc/composables/useRoute'
import useAsyncData from '#ioc/composables/useAsyncData'
import useGetTodo from '#ioc/services/useGetTodo'

const route = useRoute()
const getTodo = useGetTodo()

const { data: todo } = await useAsyncData('todo', () => getTodo(route.params.id as string))
</script>
```
