<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(
    () =>
      // @ts-ignore
      (window.sfx = true),
    2500,
  )
})
</script>
