<template>
  <Button
    color="primary"
    :disabled="loading"
    data-cy="add-to-cart"
    class="relative w-full sm:w-auto sm:h-auto mt-4 sm:mt-0 sm:ml-3 bg-green-580 rounded-[5px] font-bold text-center text-[16px] add-to-cart px-[25px]"
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
import useEmitAddToCart from '#ioc/bus/emitters/useEmitAddToCart'
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
const emitAddToCart = useEmitAddToCart()

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
    emitAddToCart({ product, quantity: props.quantity })
    isCrossSellModalOpen.value = true
  } finally {
    loading.value = false
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add to cart: Do košíku
</i18n>

<style scoped>
.add-to-cart {
  box-shadow: inset 0 1px 0 #78be20, 0 2px 4px rgb(0 0 0 / 20%), 0 1px 10px rgb(0 0 0 / 8%), 0 4px 5px rgb(0 0 0 / 9%);
  border: 1px solid rgba(46, 80, 2, 0.72157);
  background-image: linear-gradient(180deg, rgba(81, 132, 13, 0), rgba(81, 132, 13, 0.50196));
}

.add-to-cart:hover {
  border: 1px solid rgba(46, 80, 2, 0.63922);
  @apply bg-green-585;
}
</style>
