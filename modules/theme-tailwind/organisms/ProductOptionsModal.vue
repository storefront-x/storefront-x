<template>
  <Modal size="4xl">
    <Heading class="mb-4" :level="1">{{ t('Select options') }}</Heading>
    <ProductOptions in-modal="inModal" />
    <Button color="primary" :disabled="!product.isOptionsConfigured" @click="onAddToCart">
      <span v-if="!loading">{{ t('Add to cart') }}</span>
      <Spinner v-if="loading" />
    </Button>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '#ioc/atoms/Modal'
import Heading from '#ioc/atoms/Heading'
import Button from '#ioc/atoms/Button'
import ProductOptions from '#ioc/molecules/ProductOptions'
import injectProduct from '#ioc/composables/injectProduct'
import useI18n from '#ioc/composables/useI18n'
import { ref } from 'vue'
import Spinner from '#ioc/atoms/Spinner'

const emit = defineEmits(['add-to-cart'])

const product = injectProduct()
const { t } = useI18n()

const loading = ref(false)

const onAddToCart = () => {
  loading.value = true
  emit('add-to-cart')
}
</script>

<i18n lang="yaml">
cs-CZ:
  Select options: Vyberte nastavení produktu
  Add to cart: Přidat do košíku
</i18n>
