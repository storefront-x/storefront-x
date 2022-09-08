<template>
  <RouterLink :to="localePath(sliderItem.url)" class="inline-block relative w-full h-[300px]">
    <SfxImage fit="cover" :src="sliderItem.media.url" class="w-full h-full mx-auto object-cover" />
  </RouterLink>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
import useLocalePath from '#ioc/composables/useLocalePath'

defineProps({
  sliderItem: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: Number,
    default: 300,
  },
})

const localePath = useLocalePath()
</script>
