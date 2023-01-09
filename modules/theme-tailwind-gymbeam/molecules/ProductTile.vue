<template>
  <div
    class="group relative bg-white flex flex-col overflow-hidden px-3 pt-3 pb-3 sm:pt-3 sm:px-2 sm:pb-3 sm:rounded-none"
  >
    <div class="flex sm:flex-col">
      <div
        class="relative flex-1 sm:flex-none aspect-w-4 aspect-h-2 md:aspect-w-3 md:aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-36 lg:h-52 w-1/2 sm:w-auto"
      >
        <RouterLink :to="localePath(product.urlPath)" data-cy="product-title">
          <SfxImage
            :src="product.thumbnailUrl"
            :width="300"
            :alt="product.name"
            fit="contain"
            class-img="w-full h-full object-center object-contain sm:w-full sm:h-full pr-4 sm:pr-0"
            :lazy="!preloadImage"
            :preload="preloadImage"
          />
        </RouterLink>
        <div class="absolute bottom-0 left-0">
          <AddToCart class="relative bg-grey-855 rounded-none !ml-0" />
        </div>
      </div>

      <div class="flex-1 flex flex-col w-1/2 sm:w-full">
        <Heading :level="3" class="flex font-bold text-left text-sm min-h-[2.8em]">
          <RouterLink :to="localePath(product.urlPath)" data-cy="product-title">
            <span aria-hidden="true" class=""></span>
            {{ shrinkedTitle }}
          </RouterLink>
        </Heading>
        <ReviewStars class="sm:justify-start" :rating="product.ratingSummary" />
        <SfxMoney
          :money="product.finalPrice"
          class="text-sm font-bold text-secondary-500 mt-2 text-left mb-0"
          :class="product.isOnSale ? 'mb-1' : 'mb-7'"
          :data-cy="`product-price_val_${product.finalPrice.value}`"
        />
        <SfxMoney
          v-if="product.isOnSale"
          :money="product.regularPrice"
          class="line-through text-sm text-secondary-500 relative bottom-px mb-6 sm:text-left mb-0"
        />
      </div>
    </div>

    <div class="absolute top-2 left-0 pointer-events-none gap-2 p-3 space-y-1">
      <ProductLabel v-for="(label, i) in product.labels" :key="i" :label="label" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import ReviewStars from '#ioc/atoms/ReviewStars'
import SfxImage from '#ioc/components/SfxImage'
import SfxMoney from '#ioc/components/SfxMoney'
import injectProduct from '#ioc/composables/injectProduct'
import AddToCart from '#ioc/molecules/AddToCart'
import { computed } from 'vue'
import truncate from '#ioc/utils/string/truncate'
import useLocalePath from '#ioc/composables/useLocalePath'
import ProductLabel from '#ioc/atoms/ProductLabel'

defineProps({
  preloadImage: {
    type: Boolean,
    default: false,
  },
})

const localePath = useLocalePath()
const product = injectProduct()

const shrinkedTitle = computed(() => {
  return truncate(product.name, 65)
})
</script>
