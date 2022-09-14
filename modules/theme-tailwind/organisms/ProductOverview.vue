<template>
  <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
    <div class="flex flex-col">
      <ProductGallery />
    </div>

    <div class="mt-10 sm:px-0 sm:mt-16 lg:mt-0">
      <Heading :level="1" data-cy="title">{{ product.name }}</Heading>

      <div class="mt-4">
        <h3 class="sr-only">Description</h3>
        <div>{{ product?.meta?.metaDescription || '' }}</div>
      </div>

      <StockIndicator :stock-status="product.available" />

      <div class="sm:flex">
        <div class="flex">
          <div class="mt-0 mr-4 sm:mr-16">
            <div>
              <h2 class="sr-only">{{ t('Product information') }}</h2>

              <SfxMoney :money="product.finalPrice" class="text-3xl text-black font-bold" data-cy="product-price" />
            </div>

            <div v-if="product.isOnSale" class="mt-1">
              <SfxMoney :money="product.regularPrice" class="line-through text-slate-400" data-cy="product-price" />
            </div>
          </div>

          <ProductQuantityConfigurator @input="onQuantityChange" />
        </div>

        <AddToCart :quantity="quantity" />
      </div>
      <div class="flex pt-6 mt-6 border-t-2 border-gray-100">
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
import { ref } from 'vue'

const { t } = useI18n()
const product = injectProduct()

const quantity = ref(1)

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
