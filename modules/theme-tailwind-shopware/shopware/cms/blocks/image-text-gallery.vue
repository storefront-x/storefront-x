<template>
  <div
    class="relative bg-center grid grid-cols-3 gap-x-8"
    :class="shopwareCmsBlock.classes"
    :style="shopwareCmsBlock.styles"
  >
    <div class="shadow">
      <slot name="left-image" />
      <slot name="left-text" />
    </div>
    <div class="shadow">
      <slot name="center-image" />
      <slot name="center-text" />
    </div>
    <div class="shadow">
      <slot name="right-image" />
      <slot name="right-text" />
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
