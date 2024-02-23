<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="fill" :stroke="stroke" viewBox="0 0 24 24">
    <slot />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  fill: {
    type: String,
    default: 'none',
  },
  stroke: {
    type: String,
    default: 'currentColor',
  },
})
</script>
