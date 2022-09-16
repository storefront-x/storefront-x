<template>
  <slot />
</template>

<script setup lang="ts">
import useHead from '#ioc/composables/useHead'
import useRobotsStore from '#ioc/stores/useRobotsStore'

const robotsStore = useRobotsStore()

useHead({
  meta: [
    {
      name: 'robots',
      content: robotsStore.content,
    },
  ],
})
</script>
