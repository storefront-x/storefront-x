<template>
  <SfxCarousel
    :slides="products"
    :interval="3000"
    :init-slides-per-view="4"
    :breakpoints="breakpoints"
    loop
    class="relative -mx-4"
    class-slide="pb-10"
  >
    <template #default="{ slide }">
      <ProductProvider :product="slide">
        <ProductTile :index="-1" />
      </ProductProvider>
    </template>
    <template #pagination="{ pageIds, currentPage, showPage }">
      <div class="absolute w-full flex justify-center gap-4 bottom-0">
        <button
          v-for="pageId in pageIds"
          :key="pageId"
          class="w-4 h-4 rounded-full border border-gray-300 cursor-pointer"
          :class="currentPage === pageId ? 'bg-black' : 'bg-white'"
          :aria-label="currentPage"
          @click="showPage(pageId)"
        />
      </div>
    </template>
  </SfxCarousel>
</template>

<script>
import ProductProvider from '#ioc/providers/ProductProvider'
import SfxCarousel from '#ioc/components/SfxCarousel'
import ProductTile from '#ioc/molecules/ProductTile'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ProductProvider,
    SfxCarousel,
    ProductTile,
  },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    breakpoints: {
      '(max-width: 519.98px)': {
        slides: { perView: 1 },
      },
      '(min-width:520px) and (max-width: 767.98px)': {
        slides: { perView: 2 },
      },
      '(min-width:768px) and (max-width: 1199.98px)': {
        slides: { perView: 3 },
      },
      '(min-width: 1200px)': {
        slides: { perView: 4 },
      },
    },
  }),
})
</script>

<style scoped>
.row {
  overflow: hidden;
}

:deep(.keen-slider:before) {
  content: '';
  width: 1px;
  height: calc(100% - 2.5rem);
  @apply absolute top-0 left-0 bg-gray-200 z-10;
}

:deep(.keen-slider:after) {
  content: '';
  width: 1px;
  height: calc(100% - 2.5rem);
  @apply absolute top-0 right-0 bg-gray-200 z-10;
}
</style>
