<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(
    () =>
      // @ts-ignore
      (window.sfxCypressMounted = true),
    2500,
  )
})
</script>
