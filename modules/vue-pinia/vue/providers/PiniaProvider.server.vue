<template>
  <slot />
</template>

<script setup>
const inits = import.meta.glob('~/.sfx/ioc/stores/*.serverInit.*', { eager: true })

const bindedInits = Object.values(inits ?? {}).map(({ default: use }) => use())

await Promise.all(bindedInits.map((init) => init()))
</script>
