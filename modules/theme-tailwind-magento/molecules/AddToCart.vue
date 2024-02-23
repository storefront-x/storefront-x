<template>
  <Button
    color="primary"
    :disabled="isLoading"
    data-cy="add-to-cart"
    class="relative w-full sm:w-auto sm:h-auto mt-4 sm:mt-0 sm:ml-3 text-bold"
    :class="product.available || 'opacity-50 pointer-events-none'"
    :data-simple-product="product.isSimpleProduct && !product.isOptionsProduct"
    @click="onAddToCart"
  >
    <slot>
      <span v-if="!isLoading">{{ t(isEnabled ? 'Add' : 'Conf') }}</span>
      <Spinner v-if="isLoading" />
    </slot>

    <CrossSellModal v-if="isCrossSellModalOpen" @close="onClose" />
  </Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import Spinner from '#ioc/atoms/Spinner'
import injectProduct from '#ioc/composables/injectProduct'
import CrossSellModal from '#ioc/organisms/CrossSellModal'
import useI18n from '#ioc/composables/useI18n'
import useEmitAddToCart from '#ioc/bus/emitters/useEmitAddToCart'

import useRouter from '#ioc/composables/useRouter'
import useRoute from '#ioc/composables/useRoute'
import useLocalePath from '#ioc/composables/useLocalePath'
import { ref, computed } from 'vue'
import useCartStore from '#ioc/stores/useCartStore'

const props = defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
})

const { t } = useI18n()
const product = injectProduct()
const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const localePath = useLocalePath()
const emitAddToCart = useEmitAddToCart()

const isLoading = ref(false)
const isCrossSellModalOpen = ref(false)

const onClose = () => {
  isCrossSellModalOpen.value = false
}

const isEnabled = computed(() => {
  if (product.isConfigurableProduct) {
    return product.isConfigured
  }
  if (product.isBundleProduct) {
    return product.isBundleConfigured
  }
  if (product.productOptions.length) {
    return product.isOptionsConfigured
  }
  return true
})

const onAddToCart = async () => {
  if (!isEnabled.value) {
    if (route.fullPath != localePath(product.urlPath)) {
      router.push(localePath(product.urlPath))
    }

    return
  }
  isLoading.value = true

  try {
    await cartStore.addToCart(product, {
      quantity: props.quantity,
      bundle: product.bundle,
      variantSku: product.variant?.sku,
      options: product.options,
    })
    emitAddToCart({ product, quantity: props.quantity })
    isCrossSellModalOpen.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<i18n lang="yaml">
en-US:
  Add: Add to cart
  Conf: Configure
cs-CZ:
  Add: Přidat do košíku
  Conf: Nakonfigurovat
</i18n>
