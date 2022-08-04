<template>
  <div
    class="relative bg-center grid grid-cols-3 gap-x-8 justify-items-center rounded-img"
    :style="shopwareCmsBlock.styles"
  >
    <slot name="left" />
    <slot name="center" />
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

<style scoped>
.rounded-img :deep(img) {
  @apply rounded-full;
  width: 300px;
  height: 300px;
  min-height: min-content !important;
}
</style>
