<template>
  <Button
    color="primary"
    :disabled="loading"
    data-cy="add-to-cart"
    class="w-full sm:w-auto h-16 sm:h-auto mt-4 sm:mt-0 sm:ml-3 text-bold"
    @click="onAddToCart"
  >
    <slot>
      <span v-if="!loading">{{ t('Add to cart') }}</span>
      <Spinner v-else />
    </slot>
  </Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import Spinner from '#ioc/atoms/Spinner'
import injectProduct from '#ioc/composables/injectProduct'
import useI18n from '#ioc/composables/useI18n'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useAddToCart from '#ioc/services/useAddToCart'
import { ref } from 'vue'

const props = defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
})

const { t } = useI18n()
const product = injectProduct()
const addToCart = useAddToCart()
const showSuccessNotification = useShowSuccessNotification()

const loading = ref(false)

const onAddToCart = async () => {
  try {
    loading.value = true

    await addToCart(product, { quantity: props.quantity })
  } finally {
    loading.value = false
  }

  showSuccessNotification(t('Added to cart'), t('{0} was added to cart', [product.name]))
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add to cart: Přidat do košíku
</i18n>
