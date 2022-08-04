<template>
  <div class="relative bg-center grid grid-cols-2 gap-x-8" :style="shopwareCmsBlock.styles">
    <div class="grid grid-rows-2 gap-y-8">
      <slot name="left-top" />
      <slot name="left-bottom" />
    </div>
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
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
</script>
