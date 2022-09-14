<template>
  <Modal size="4xl">
    <Heading class="mb-4" :level="1">{{ t('Select bundles') }}</Heading>
    <ProductBundleOptions />
    <Button color="primary" :disabled="!product.isBundleConfigured" @click="onAddToCart">
      {{ t('Add to cart') }}
    </Button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import ProductBundleOptions from '#ioc/molecules/ProductBundleOptions'
import injectProduct from '#ioc/composables/injectProduct'
import useI18n from '#ioc/composables/useI18n'

const emit = defineEmits(['add-to-cart'])

const product = injectProduct()
const { t } = useI18n()

const onAddToCart = () => {
  emit('add-to-cart')
}
</script>

<i18n lang="yaml">
cs-CZ:
  Select bundles: Vyberte přibalené produkty
  Add to cart: Přidat do košíku
</i18n>
