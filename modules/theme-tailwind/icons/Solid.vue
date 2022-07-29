<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :viewBox="viewBox" :fill="fill">
    <slot />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    viewBox: {
      required: false,
      default: '0 0 20 20',
      type: String,
    },
    fill: {
      default: 'currentColor',
      type: String,
    },
  },
})
</script>
