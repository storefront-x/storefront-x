<template>
  <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start relative">
    <div class="flex flex-col">
      <ProductGallery />
    </div>

    <div class="absolute top-2 left-0 pointer-events-none gap-2 p-3 space-y-1">
      <ProductLabel v-for="(label, i) in product.labels" :key="i" :label="label" />
    </div>

    <div class="mt-10 sm:px-0 sm:mt-16 lg:mt-0">
      <Heading :level="1" data-cy="title">{{ product.name }}</Heading>
      <ReviewStars class="mt-2" :rating="product.ratingSummary" :count="product.reviewCount" />

      <div v-if="product.productOptions.length" class="mt-3">
        <h2 class="sr-only">Product options</h2>

        <ProductOptions />
      </div>

      <div v-if="product.isConfigurableProduct" class="mt-3">
        <h2 class="sr-only">Product configurations</h2>

        <ProductConfigurableOptions />
      </div>

      <div v-if="product.isBundleProduct" class="mt-3">
        <h2 class="sr-only">Product bundles</h2>

        <ProductBundleOptions />
      </div>

      <div class="mt-4">
        <h3 class="sr-only">Description</h3>
        <div class="links" v-html="product.shortDescriptionHtml" />
      </div>

      <StockIndicator :stock-status="product.available" />

      <div class="sm:flex">
        <div class="flex">
          <div class="mt-0 mr-4 sm:mr-16">
            <div>
              <h2 class="sr-only">{{ t('Product information') }}</h2>

              <SfxMoney
                :money="product.finalPrice"
                class="text-3xl text-black font-bold"
                :class="discounted"
                data-cy="product-price"
              />
            </div>

            <div v-if="product.isOnSale" class="mt-1">
              <SfxMoney :money="product.regularPrice" class="line-through text-slate-400" data-cy="product-price" />
            </div>
          </div>

          <ProductQuantityConfigurator @input="onQuantityChange" />
        </div>

        <AddToCart :quantity="quantity" />
      </div>

      <GroupedItems v-if="product.groupedItems.length && product.isGroupedProduct" />

      <GiftPanel />

      <div class="flex">
        <AddToWishlist :title="t('Add')" />
        <FacebookShare />
      </div>
      <div class="w-full flex mt-4 text-gray-400">
        <p class="mr-1">{{ t('Warranty: 24 months') }} |</p>
        <p>SKU: {{ product.sku }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import SfxMoney from '#ioc/components/SfxMoney'
import Heading from '#ioc/atoms/Heading'
import ProductQuantityConfigurator from '#ioc/molecules/ProductQuantityConfigurator'
import AddToCart from '#ioc/molecules/AddToCart'
import ProductGallery from '#ioc/molecules/ProductGallery'
import StockIndicator from '#ioc/atoms/StockIndicator'
import FacebookShare from '#ioc/atoms/FacebookShare'
import AddToWishlist from '#ioc/molecules/AddToWishlist'
import injectProduct from '#ioc/composables/injectProduct'
import { computed, defineAsyncComponent, ref } from 'vue'
import ReviewStars from '#ioc/atoms/ReviewStars'
import GiftPanel from '#ioc/atoms/GiftPanel'
import ProductLabel from '#ioc/atoms/ProductLabel'

const ProductBundleOptions = defineAsyncComponent(() => import('#ioc/molecules/ProductBundleOptions'))
const ProductConfigurableOptions = defineAsyncComponent(() => import('#ioc/molecules/ProductConfigurableOptions'))
const ProductOptions = defineAsyncComponent(() => import('#ioc/molecules/ProductOptions'))
const GroupedItems = defineAsyncComponent(() => import('#ioc/molecules/GroupedItems'))

const { t } = useI18n()
const product = injectProduct()

const quantity = ref(1)

const discounted = computed(() => {
  return {
    'text-gray-900': !product.isOnSale,
    'text-primary-600': product.isOnSale,
  }
})

const onQuantityChange = (q: number) => {
  quantity.value = q
}
</script>

<style scoped>
.links:deep(a) {
  @apply text-primary-500 underline;
}
</style>

<i18n lang="yaml">
cs-CZ:
  'IN_STOCK': 'Skladem'
  'OUT_OF_STOCK': 'Vyprodáno'
  'Warranty: 24 months': 'Záruka: 24 měsíců'
  'Product information': 'Informace o produktu'
  'Add': 'Oblíbený'
</i18n>
