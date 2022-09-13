<template>
  <div
    class="group relative bg-white flex flex-col overflow-hidden border-r border-b border-gray-200 px-3 pt-3 pb-5 sm:pt-4 sm:px-5 sm:pb-6 rounded-lg sm:rounded-none"
    :class="classesBorders"
  >
    <div class="flex sm:flex-col">
      <div
        class="flex-1 sm:flex-none aspect-w-4 aspect-h-2 md:aspect-w-3 md:aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-36 lg:h-52 w-1/2 sm:w-auto"
      >
        <SfxImage
          :src="product.thumbnailUrl"
          :width="300"
          :height="200"
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
          class="flex items-center sm:justify-center sm:text-center p-0 mt-4 sm:mt-0 mb-5 sm:h-20 text-neutral-600 text-base font-medium"
        >
          <RouterLink :to="localePath(product.urlPath)" data-cy="product-title">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ shrinkedTitle }}
          </RouterLink>
        </Heading>

        <SfxMoney
          :money="product.finalPrice"
          class="text-xl font-semibold text-neutral-600 mt-2 sm:mt-4 sm:text-center"
          :class="product.isOnSale ? 'mb-1' : 'mb-7'"
          data-cy="product-price"
        />
        <SfxMoney
          v-if="product.isOnSale"
          :money="product.regularPrice"
          class="line-through text-md text-gray-400 relative bottom-px mb-6 sm:text-center"
        />
      </div>
    </div>
    <div class="flex sm:flex-col mt-auto">
      <AddToCart />
    </div>
    <AddToWishlist class="absolute top-3 right-4" :fill-on-hover="true" @click.stop />
  </div>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import SfxImage from '#ioc/components/SfxImage'
import SfxMoney from '#ioc/components/SfxMoney'
import injectProduct from '#ioc/composables/injectProduct'
import AddToCart from '#ioc/molecules/AddToCart'
import AddToWishlist from '#ioc/molecules/AddToWishlist'
import { computed } from 'vue'
import truncate from '#ioc/utils/string/truncate'
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

const props = defineProps({
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

const classesBorders = computed(() => {
  let myClasses = ''

  if (props.index === -1) {
    return 'border-t'
  }

  if (props.index === 0) {
    myClasses = 'border-t border-l'
    return myClasses
  } else if (props.index === 1) {
    myClasses = 'border-t '
  } else if (props.index === 2) {
    myClasses = 'border-t sm:border-t-0 xl:border-t '
  } else if (props.index === 3) {
    myClasses = 'border-t sm:border-t-0 2xl:border-t '
  } else {
    myClasses = 'border-t sm:border-t-0 '
  }

  if (props.index % 3 === 0 && props.index % 2 !== 0) {
    myClasses += 'border-l sm:border-l-0 xl:border-l 2xl:border-l-0 '
  } else if (props.index % 3 === 0 && props.index % 2 === 0) {
    myClasses += 'border-l 2xl:border-l-0 '
  } else if (props.index % 2 === 0) {
    myClasses += 'border-l xl:border-l-0 '
    if (props.index % 4 === 0) {
      myClasses += '2xl:border-l '
    }
  } else {
    myClasses += 'border-l sm:border-l-0'
  }

  return myClasses
})
</script>
