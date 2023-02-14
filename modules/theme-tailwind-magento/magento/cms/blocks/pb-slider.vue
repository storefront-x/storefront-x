<template>
  <div>
    <SfxCarousel :slides="pbSlider.slides" :style="styles" :loop="true">
      <template #default="{ slide, index }">
        <Slide :el="slide" :index="index" />
      </template>
      <template #controls="{ isLastPage, isFirstPage, showPrevSlide, showNextSlide }">
        <button v-if="!isFirstPage" class="absolute hidden md:block h-full left-0 top-0 z-10" @click="showPrevSlide()">
          <OutlineChevronLeft class="text-white" />
        </button>
        <button v-if="!isLastPage" class="absolute hidden md:block h-full right-0 top-0 z-10" @click="showNextSlide()">
          <OutlineChevronRight class="text-white" />
        </button>
      </template>
      <template #pagination="{ pageIds, currentPage, showPage }">
        <div v-if="pbSlider.showDots" class="absolute w-full flex justify-center gap-4 bottom-0 p-4">
          <button
            v-for="pageId in pageIds"
            :key="pageId"
            class="w-4 h-4 rounded-full border cursor-pointer"
            :class="currentPage === pageId ? 'bg-black border-gray-700' : 'bg-white border-gray-300'"
            :aria-label="String(currentPage)"
            @click="showPage(pageId)"
          />
        </div>
      </template>
    </SfxCarousel>
  </div>
</template>

<script setup lang="ts">
import SfxCarousel from '#ioc/components/SfxCarousel'
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import usePbSlider from '#ioc/composables/cms/usePbSlider'
import OutlineChevronLeft from '#ioc/icons/OutlineChevronLeft'
import OutlineChevronRight from '#ioc/icons/OutlineChevronRight'
import { computed, PropType } from 'vue'
import Slide from './pb-slide.vue'

const props = defineProps({ el: { type: Object as PropType<HTMLElement>, default: null } })

const pbSlider = usePbSlider(props.el)
const pbBlock = usePbBlock(props.el)

const styles = computed(() => {
  return { ...pbBlock.advanced }
})
</script>
