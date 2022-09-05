<template>
  <a :href="sliderItem.url" :target="sliderItem.newTab" class="inline-block relative w-full h-[300px]">
    <SfxImage fit="cover" :src="sliderItem.media.url" class="w-full h-full mx-auto object-cover" />
  </a>
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'

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
</script>
