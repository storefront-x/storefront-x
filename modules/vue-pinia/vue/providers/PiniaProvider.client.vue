<template>
  <slot />
</template>

<script setup>
import { onMounted } from 'vue'

const inits = import.meta.glob('~/.sfx/ioc/stores/*.clientInit.*', { eager: true })
const sortedInits = Object.entries(inits).sort(([keyA], [keyB]) => {
  const isFirstA = keyA.includes('.first')
  const isFirstB = keyB.includes('.first')

  if (isFirstA && !isFirstB) return -1
  if (!isFirstA && isFirstB) return 1

  return 0
})

const bindedInits = sortedInits.map(([, { default: use }]) => use())

onMounted(async () => {
  await Promise.all(bindedInits.map((init) => init()))
})
</script>
