<template>
  <Component :is="tag">
    <slot />
  </Component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: Number,
    default: 1,
  },
})

const tag = computed(() => `h${props.level}`)
</script>
