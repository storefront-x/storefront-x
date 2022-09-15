<template>
  <Button
    color="primary"
    :disabled="loading"
    data-cy="add-to-cart"
    class="relative w-full sm:w-auto sm:h-auto mt-4 sm:mt-0 sm:ml-3 text-bold"
    @click="onAddToCart"
  >
    <slot>
      <span v-if="!loading">{{ t('Add to cart') }}</span>
      <Spinner v-if="loading" />
    </slot>

    <CrossSellModal v-if="isCrossSellModalOpen" @close="onClose" />
  </Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import Spinner from '#ioc/atoms/Spinner'
import injectProduct from '#ioc/composables/injectProduct'
import useAddToCart from '#ioc/services/useAddToCart'
import CrossSellModal from '#ioc/organisms/CrossSellModal'
import useI18n from '#ioc/composables/useI18n'
import { ref } from 'vue'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

const showErrorNotification = useShowErrorNotification()

const props = defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
})

const { t } = useI18n()
const product = injectProduct()
const addToCart = useAddToCart()

const loading = ref(false)
const isCrossSellModalOpen = ref(false)

const onClose = () => {
  isCrossSellModalOpen.value = false
}

const onAddToCart = async () => {
  loading.value = true
  try {
    await addToCart(product, {
      quantity: props.quantity,
    })
    isCrossSellModalOpen.value = true
  } catch (e: any) {
    showErrorNotification(e)
  } finally {
    loading.value = false
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add to cart: Přidat do košíku
</i18n>
