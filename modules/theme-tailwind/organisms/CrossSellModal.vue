<template>
  <Modal @close="emit('close')">
    <div>
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <svg
          class="h-6 w-6 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ t('Added to cart') }}
        </h3>
      </div>
    </div>
    <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
      <Button class="w-full" data-cy="continue-shopping" @click="emit('close')">
        {{ t('Continue shopping') }}
      </Button>
      <Button :to="localePath('checkout')" color="primary" class="mt-3 sm:mt-0" data-cy="continue-to-checkout">
        {{ t('Continue to checkout') }}
      </Button>
    </div>

    <div v-if="data.products.length" class="mt-2">
      <h5 class="w-100 font-medium text-lg text-gray-900 text-center my-4">
        {{ t('Other people also like to buy') }}:
      </h5>

      <ul class="divide-y divide-gray-200 text-sm font-medium text-gray-900">
        <ProductProvider v-for="crossSell in data.products" :key="crossSell.sku" :product="crossSell">
          <CrossSellProduct />
        </ProductProvider>
      </ul>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import useGetCrossSellForProduct from '#ioc/services/useGetCrossSellForProduct'
import ProductProvider from '#ioc/providers/ProductProvider'
import Modal from '#ioc/atoms/Modal'
import useI18n from '#ioc/composables/useI18n'
import Button from '#ioc/atoms/Button'
import useLocalePath from '#ioc/composables/useLocalePath'
import CrossSellProduct from '#ioc/molecules/CrossSellProduct'
import useAsyncData from '#ioc/composables/useAsyncData'
import injectProduct from '#ioc/composables/injectProduct'

const emit = defineEmits(['close'])

const { t } = useI18n()
const localePath = useLocalePath()
const product = injectProduct()
const getCrossSellForProduct = useGetCrossSellForProduct()

const { data } = await useAsyncData('GetCrossSellProducts', () => getCrossSellForProduct(product))
</script>

<i18n lang="yaml">
cs-CZ:
  Added to cart: Přidáno do košíku
  Continue shopping: Pokračovat v nákupu
  Continue to checkout: Pokračovat do košíku
  Other people also like to buy: Ostatní také nakupují
</i18n>
