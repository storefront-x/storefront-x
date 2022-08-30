<template>
  <textarea
    class="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-primary-500 focus:border-primary-500 border border-warm-gray-300 rounded-md"
    v-bind="$attrs"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
})
</script>
