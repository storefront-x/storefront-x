<template>
  <div class="relative bg-center" :style="shopwareCmsBlock.styles">
    <SfxCarousel :slides="slides" :interval="6000" :loop="true">
      <template #default="{ slide, index }">
        <ImageSliderItem :slider-item="slide" :index="index" :height="height" />
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
import { computed } from 'vue'
import SfxCarousel from '#ioc/components/SfxCarousel'
import ImageSliderItem from './image-slider-item.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)

const slides = computed(() => props.data.slots[0].data.sliderItems)

const height = computed(() => Number(props.data.slots[0].config.minHeight.value.replace('px', '')))
</script>
