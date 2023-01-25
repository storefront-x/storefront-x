<template>
  <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
    <div class="flex flex-col">
      <ProductGallery />
    </div>

    <div class="mt-10 sm:px-0 sm:mt-16 lg:mt-0">
      <Heading :level="1" data-cy="title">{{ product.name }}</Heading>
      <p class="font-light">{{ product.label }}</p>
      <div class="flex">
        <p class="mr-2">Značka:</p>
        <p class="uppercase font-semibold text-blue-560">{{ product.brandName }}</p>
      </div>
      <div class="mt-4">
        <h3 class="sr-only">Description</h3>
        <div v-html="product?.meta?.description || ''"></div>
      </div>

      <StockIndicator :stock-status="product.available" />

      <div class="sm:flex border border-grey-560 rounded-[7px] bg-grey-570 p-[24px] sm:justify-between">
        <div class="flex justify-center sm:justify-start">
          <div class="mt-0 mr-4 sm:mr-16">
            <div>
              <h2 class="sr-only">{{ t('Product information') }}</h2>

              <SfxMoney
                :money="product.finalPrice"
                class="text-3xl text-black font-bold text-red-555"
                data-cy="product-price"
              />
            </div>

            <div v-if="product.isOnSale" class="mt-1">
              <SfxMoney :money="product.regularPrice" class="line-through text-slate-400" data-cy="product-price" />
            </div>
          </div>
        </div>
        <div class="flex justify-end sm:items-center mt-4 sm:mt-0">
          <ProductQuantityConfigurator @input="onQuantityChange" />
          <AddToCart :quantity="quantity" class="!mt-0 !h-[40px] sm:ml-2" />
        </div>
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
