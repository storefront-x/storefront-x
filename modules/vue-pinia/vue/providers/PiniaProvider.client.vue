<template>
  <slot />
</template>

<script setup>
import { onMounted } from 'vue'

const clientInits = import.meta.glob('#ioc/stores/*.clientInit.*', { eager: true })

onMounted(async () => {
  const loaders = []

  for (const { default: init } of Object.values(clientInits ?? {})) {
    loaders.push(init())
  }

  await Promise.all(loaders)
})
</script>
