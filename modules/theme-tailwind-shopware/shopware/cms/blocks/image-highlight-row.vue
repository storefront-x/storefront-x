<template>
  <div class="relative bg-center grid grid-cols-3 gap-x-8 highlighted" :style="shopwareCmsBlock.styles">
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
.highlighted > :deep(a) {
  @apply border-[12px] border-white;
}
</style>
