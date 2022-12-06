<template>
  <div class="relative bg-center grid grid-cols-4 gap-x-8" :style="shopwareCmsBlock.styles">
    <slot name="left" />
    <slot name="center-left" />
    <slot name="center-right" />
    <slot name="right" />
  </div>
</template>

<script setup lang="ts">
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  section: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
</script>
