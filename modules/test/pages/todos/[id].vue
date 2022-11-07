<template>
  <div>
    {{ todo.title }}
  </div>
  <RouterLink :to="`/todos/${Number(route.params.id) + 1}`">Next</RouterLink>
</template>

<script setup lang="ts">
import useRoute from '#ioc/composables/useRoute'
import useResource from '#ioc/composables/useResource'

const route = useRoute()

const [todo] = await useResource(
  () => `https://jsonplaceholder.typicode.com/todos/${route.params.id}`,
  (url) => fetch(url).then((r) => r.json()),
)
</script>
