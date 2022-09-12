<template>
  <div v-if="shopwareCmsBlock.hasChildren" class="relative bg-center" :style="shopwareCmsBlock.styles">
    <div class="z-10 relative flex" :style="shopwareCmsBlock.verticalAlign(data)">
      <slot name="default" />
    </div>
  </div>
  <RouterLink
    v-else
    :to="shopwareImageCmsBlock.url"
    :target="shopwareImageCmsBlock.newTab"
    class="inline-block relative w-full"
    :style="shopwareImageCmsBlock.minHeight"
  >
    <SfxImage
      :src="shopwareImageCmsBlock.src"
      class="absolute inset-0 w-full h-full mx-auto"
      :style="shopwareImageCmsBlock.objectMode"
    />
  </RouterLink>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'
import useShopwareCmsImageBlock from '#ioc/composables/useShopwareCmsImageBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
const shopwareImageCmsBlock = useShopwareCmsImageBlock(props)
</script>
