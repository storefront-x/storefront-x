<template>
  <div>
    <SfxCarousel :slides="slides" :style="styles" :interval="6000" :loop="true">
      <template #default="{ slide, index }">
        <Slide :el="slide" :index="index" />
      </template>

      <template #pagination="{ pageIds, currentPage, showPage }">
        <div v-if="showDots" class="absolute w-full flex justify-center gap-4 bottom-0 p-4">
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

<script>
import SfxCarousel from '#ioc/components/SfxCarousel'
import Slide from './pb-slide.vue'
import IsPbBlock from '#ioc/mixins/IsPbBlock'
import IsPbSlider from '#ioc/mixins/IsPbSlider'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SfxCarousel,
    Slide,
  },

  mixins: [IsPbBlock, IsPbSlider],

  computed: {
    styles() {
      return {
        ...this.advanced,
      }
    },
  },
})
</script>
