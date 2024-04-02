<template>
  <slot />
</template>

<script setup>
import { onMounted } from 'vue'

const inits = import.meta.glob('~/.sfx/ioc/stores/*.clientInit.*', { eager: true })

const bindedInits = Object.values(inits ?? {}).map(({ default: use }) => use())

onMounted(async () => {
  await Promise.all(bindedInits.map((init) => init()))
})
</script>
