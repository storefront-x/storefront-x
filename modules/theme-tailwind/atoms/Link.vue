<template>
  <Component :is="component">
    <slot />
  </Component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    component() {
      return this.$attrs.to ? 'RouterLink' : 'a'
    },
  },
})
</script>
