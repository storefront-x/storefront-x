<template>
  <div class="flex justify-center">
    <template v-if="product.isPriceViewRange">
      <p :class="labelClasses">{{ t('priceFrom') }}</p>
      <SfxMoney :money="product.finalPrice" :class="classes" data-cy="product-price-from" />
      <p :class="labelClasses">{{ t('priceTo') }}</p>
      <SfxMoney :money="product.maximumPrice" :class="classes" data-cy="product-price-to" />
    </template>
    <template v-if="product.isPriceViewAsLowAs">
      <p :class="labelClasses">{{ t('asLowAs') }}</p>
      <SfxMoney :money="product.minimumPrice" :class="classes" data-cy="product-price-as-low-as" />
    </template>
  </div>
</template>

<script setup>
import useI18n from '#ioc/composables/useI18n'
import SfxMoney from '#ioc/components/SfxMoney'
import injectProduct from '#ioc/composables/injectProduct'

const { t } = useI18n()
const product = injectProduct()

defineProps({
  classes: {
    type: String,
    default: '',
    required: false,
  },
  labelClasses: {
    type: String,
    default: '',
    required: false,
  },
})
</script>

<i18n lang="yaml">
en-US:
  priceFrom: 'from'
  priceTo: 'to'
  asLowAs: 'as low as'
cs-CZ:
  priceFrom: 'od'
  priceTo: 'do'
  asLowAs: 'od'
</i18n>
