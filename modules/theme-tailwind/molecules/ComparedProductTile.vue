<template>
  <td class="shrink-0 w-64 sm:w-72">
    <div class="flex" name="row1">
      <div class="p-4 relative w-72" name="data">
        <button
          type="button"
          class="absolute top-0 right-0 mr-2 re w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
          @click="removeProduct"
        >
          <span class="sr-only">{{ t('Close menu') }}</span>
          <OutlineX class="z-10" />
        </button>
        <div
          class="flex-1 sm:flex-none aspect-w-4 aspect-h-2 md:aspect-w-3 md:aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-36 lg:h-52 w-auto"
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

        <Heading
          :level="3"
          class="flex items-center sm:justify-center sm:text-center p-0 mt-4 sm:mt-0 mb-5 sm:h-20 text-neutral-600 text-base font-medium"
        >
          <RouterLink :to="localePath(product.urlPath)" data-cy="product-title">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ product.name }}
          </RouterLink>
        </Heading>
        <div class="mt-4">
          <ReviewStars :rating="product.ratingSummary" :count="product.reviewCount" />
        </div>
        <div class="mt-4">
          <span v-if="isNotSimple" class="mr-2 text-sm">{{ t('As low as') }}</span>
          <SfxMoney
            :money="product.finalPrice"
            class="text-xl font-semibold text-neutral-600 mt-2 sm:mt-4 sm:text-center"
            :class="product.isOnSale ? 'mb-1' : 'mb-7'"
            :data-cy="`product-price_val_${product.finalPrice.value}`"
          />
        </div>
        <div class="flex justify-start mt-4 space-x-3">
          <AddToCart />
          <AddToWishlist :fill-on-hover="true" :compare="true" class="mt-4 sm:mt-0" @click.stop />
        </div>
      </div>
    </div>
  </td>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import injectProduct from '#ioc/composables/injectProduct'
import AddToCart from '#ioc/molecules/AddToCart'
import SfxImage from '#ioc/components/SfxImage'
import ReviewStars from '#ioc/atoms/ReviewStars'
import SfxMoney from '#ioc/components/SfxMoney'
import OutlineX from '#ioc/icons/OutlineX'
import useRemoveProductFromComparison from '#ioc/services/useRemoveProductFromComparison'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import AddToWishlist from '#ioc/molecules/AddToWishlist'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import { computed } from 'vue'

const localePath = useLocalePath()
const product = injectProduct()
const removeComparedProducts = useRemoveProductFromComparison()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const { t } = useI18n()

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 1,
  },
  preloadImage: {
    type: Boolean,
    default: false,
  },
})

const isNotSimple = computed(() => {
  if (product.isConfigurableProduct || product.isBundleProduct || product.productOptions.length) {
    return true
  }

  return false
})

const removeProduct = async () => {
  try {
    await removeComparedProducts(product)
    showSuccessNotification('', t('Product has been removed successfully'))
  } catch (error) {
    showErrorNotification(error)
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  As low as: Za pouze
  Description: Parametry
  Product has been removed successfully: Produkt byl úspěšně odstraněn
</i18n>
