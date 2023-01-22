<template>
  <a
    class="sm:px-2 px-2 md:px-4 py-2 hover:cursor-pointer hover:border-primary-500 bg-white"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    classes: {
      type: [String, Array, Object],
      default: undefined,
    },
  },
})
</script>
