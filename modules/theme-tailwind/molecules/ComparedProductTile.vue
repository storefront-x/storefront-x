<template>
  <div class="flex" name="row1">
    <div v-if="index === 0" class="w-20 border-r py-4" name="header"></div>
    <div class="p-4 border-t relative" name="data">
      <button
        type="button"
        class="absolute top-0 right-0 mr-2 re w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
        @click="removeProduct"
      >
        <span class="sr-only">Close menu</span>
        <OutlineX />
      </button>
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

      <div class="mt-4">{{ shrinkedTitle }}</div>
      <div class="mt-4"><ReviewStars :rating="product.ratingSummary" :count="product.reviewCount" /></div>
      <div class="mt-4">
        As low as
        <SfxMoney
          :money="product.finalPrice"
          class="mt-2 sm:mt-4 sm:text-center"
          :class="product.isOnSale ? 'mb-1' : 'mb-7'"
          data-cy="product-price"
        />
      </div>
      <div class="flex justify-start mt-4">
        <AddToCart class="mr-3" />
        <AddToWishlist :fill-on-hover="true" @click.stop />
      </div>
    </div>
  </div>
  <div class="flex border-t" name="row2">
    <div v-if="index === 0" class="border-r py-4 w-20" name="header">SKU</div>
    <div class="p-4">{{ product.sku }}</div>
  </div>
  <div class="flex border-t" name="row3">
    <div v-if="index === 0" class="border-r py-4" name="description">Description</div>
    <div class="px-4 pt-2 h-90 max-w-sm" name="row3">
      <div v-html="product.shortDescriptionHtml" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import injectProduct from '#ioc/composables/injectProduct'
import AddToCart from '#ioc/molecules/AddToCart'
import SfxImage from '#ioc/components/SfxImage'
import ReviewStars from '#ioc/atoms/ReviewStars'
import SfxMoney from '#ioc/components/SfxMoney'
import OutlineX from '#ioc/icons/OutlineX'
import truncate from '#ioc/utils/string/truncate'
import userRemoveComparedProducts from '#ioc/services/userRemoveComparedProducts'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import AddToWishlist from '#ioc/molecules/AddToWishlist'
import { computed } from 'vue'

const { t } = useI18n()
const product = injectProduct()
const removeComparedProducts = userRemoveComparedProducts()
const showErrorNotification = useShowErrorNotification()
const shrinkedTitle = computed(() => {
  return truncate(product.name, 40)
})

const removeProduct = async () => {
  try {
    await removeComparedProducts(product)
  } catch (error) {
    showErrorNotification(error)
  }
}

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 1,
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Wishlist: Seznam přání
</i18n>
