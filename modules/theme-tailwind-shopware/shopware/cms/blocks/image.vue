<template>
  <div v-if="shopwareCmsBlock.hasChildren" class="relative bg-center" :style="shopwareCmsBlock.styles">
    <div class="z-10 relative flex" :style="shopwareCmsBlock.verticalAlign(data)">
      <slot name="default" />
    </div>
  </div>
  <Link
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
  </Link>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'
import useShopwareCmsImageBlock from '#ioc/composables/useShopwareCmsImageBlock'
import Link from '#ioc/atoms/Link'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
const shopwareImageCmsBlock = useShopwareCmsImageBlock(props)
</script>
