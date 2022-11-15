<template>
  <div class="relative bg-center" :style="shopwareCmsBlock.styles">
    <div class="grid grid-cols-[33%_auto] gap-x-10">
      <slot name="left" />
      <slot name="right" />
    </div>
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
