<template>
  <div v-for="todo in todos" :key="todo.id">
    <RouterLink :to="`/todos/${todo.id}`">
      {{ todo.title }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import useResource from '#ioc/composables/useResource'

const [todos] = await useResource(
  () => 'https://jsonplaceholder.typicode.com/todos',
  (url) => fetch(url).then((r) => r.json()),
)
</script>
