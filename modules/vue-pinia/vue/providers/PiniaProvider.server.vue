<template>
  <slot />
</template>

<script setup>
const serverInits = import.meta.glob('#ioc/stores/*.serverInit.*', { eager: true })

const loaders = []

for (const { default: serverInit } of Object.values(serverInits ?? {})) {
  loaders.push(serverInit())
}

await Promise.all(loaders)
</script>
