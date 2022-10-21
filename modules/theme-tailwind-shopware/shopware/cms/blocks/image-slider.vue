<template>
  <div class="relative bg-center" :style="shopwareCmsBlock.styles">
    <SfxCarousel :slides="shopwareCmsImageSliderBlock.slides" :loop="true">
      <template #default="{ slide, index }">
        <ImageSliderItem :slider-item="slide" :index="index" :height="shopwareCmsImageSliderBlock.height" />
      </template>

      <template #pagination="{ pageIds, currentPage, showPage }">
        <div class="absolute w-full flex justify-center gap-4 bottom-0 p-4">
          <button
            v-for="pageId in pageIds"
            :key="pageId"
            class="w-4 h-4 rounded-full border cursor-pointer"
            :class="currentPage === pageId ? 'bg-black border-gray-700' : 'bg-white border-gray-300'"
            :aria-label="currentPage"
            @click="showPage(pageId)"
          />
        </div>
      </template>
    </SfxCarousel>
  </div>
</template>

<script setup lang="ts">
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'
import SfxCarousel from '#ioc/components/SfxCarousel'
import ImageSliderItem from './image-slider-item.vue'
import useShopwareCmsImageSliderBlock from '#ioc/composables/useShopwareCmsImageSliderBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
const shopwareCmsImageSliderBlock = useShopwareCmsImageSliderBlock(props)
</script>
