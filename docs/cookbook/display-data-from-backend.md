# How to display data from backend

## 1. Create a new mapper

We need mapper to sanitize data returned from backend. We also use mappers to provide use with type information.

> `mappers/ToTodo.ts`

```ts
export default (data: any) => ({
  id: data.id as number,
  title: data.title as string,
  done: (data.completed ?? false) as boolean,
})
```

## 2. Create new repository

We need repository for communication with backend. In this repository we can use `fetch` method or some adapter (e.g. `useShopware`). In this example, we will display a todo from the [JSON placeholder](https://jsonplaceholder.typicode.com).

> `repositories/useGetTodoRepository.ts`

```ts
import ToTodo from '#ioc/mappers/ToTodo'

export default () => {
  return async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    const json = await response.json()
    return ToTodo(json)
  }
}
```

## 3. Create a new service

Service wraps repository and adds business logic. A lot of the times there might not be additional business logic, so services might be basically empty.

> `services/useGetTodo.ts`

```ts
import useGetTodoRepository from '#ioc/repositories/useGetTodoRepository'

export default () => {
  const getTodoRepository = useGetTodoRepository()

  return async (id: string) => {
    return await getTodoRepository(id)
  }
}
```

## 4. Fetch data in a component

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
