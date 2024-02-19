<template>
  <div
    class="group relative bg-white flex flex-col overflow-hidden px-3 pt-3 pb-5 sm:pt-4 sm:px-5 sm:pb-6 rounded-lg sm:rounded-none transition ease-in-out delay-[10ms] hover:bg-black hover:bg-opacity-5"
  >
    <div class="flex sm:flex-col">
      <div
        class="flex-1 sm:flex-none aspect-w-4 aspect-h-2 md:aspect-w-3 md:aspect-h-4 sm:aspect-none sm:h-36 lg:h-52 w-1/2 sm:w-auto"
      >
        <SfxImage
          :src="product.thumbnailUrl"
          :width="300"
          :height="300"
          :alt="product.name"
          fit="contain"
          class-img="w-full h-full object-center object-contain sm:w-full sm:h-full pr-4 sm:pr-0"
          :lazy="!preloadImage"
          :preload="preloadImage"
        />
      </div>

      <div class="flex-1 flex flex-col w-1/2 sm:w-full">
        <Heading
          :level="3"
          class="flex items-center sm:justify-center sm:text-center p-0 mt-4 sm:mt-0 mb-0 text-neutral-600 text-base font-medium"
        >
          <RouterLink
            :to="localePath(product.urlPath)"
            data-cy="product-title"
            class="font-bold text-primary-500 text-base uppercase"
          >
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ shrinkedTitle }}
          </RouterLink>
        </Heading>
        <template v-if="product.isBundleProduct">
          <ProductBundlePrice
            :classes="`text-xl font-bold text-primary-500 mr-2`"
            class="mt-0"
            :label-classes="`-mt-1 mr-1`"
          />
        </template>
        <template v-else>
          <SfxMoney
            :money="product.finalPrice"
            class="text-sm font-bold text-primary-500 mt-0 sm:text-center"
            :class="product.isOnSale ? 'mb-0' : 'mb-2'"
            :data-cy="`product-price_val_${product.finalPrice.value}`"
          />
          <SfxMoney
            v-if="product.isOnSale"
            :money="product.regularPrice"
            class="line-through text-md text-gray-400 relative bottom-px mb-6 sm:text-center"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import SfxImage from '#ioc/components/SfxImage'
import SfxMoney from '#ioc/components/SfxMoney'
import injectProduct from '#ioc/composables/injectProduct'
import ProductBundlePrice from '#ioc/molecules/ProductBundlePrice'
import { computed } from 'vue'
import truncate from '#ioc/utils/string/truncate'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

defineProps({
  preloadImage: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const product = injectProduct()

const shrinkedTitle = computed(() => {
  return truncate(product.name, 65)
})
</script>
