<template>
  <Component
    :is="href ? 'a' : 'RouterLink'"
    :to="to"
    :href="href"
    class="font-medium text-gray-900 hover:bg-gray-100 block px-4 py-2"
    role="menuitem"
    tabindex="-1"
  >
    <slot />
  </Component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  },
})
</script>
