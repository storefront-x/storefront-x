<template>
  <slot />
</template>

<script setup>
const stores = import.meta.globEager('#ioc/stores/*')

const loaders = []

for (const { default: useStore } of Object.values(stores ?? {})) {
  const store = useStore()
  if (store.serverInit) {
    loaders.push(Promise.resolve(store.serverInit()).then((data) => store.$patch(data)))
  }
}

await Promise.all(loaders)
</script>
