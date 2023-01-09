<template>
  <Button
    color="secondary"
    :disabled="isLoading"
    data-cy="add-to-cart"
    :class="{ 'px-16': productDetail, 'bg-secondary-500': productDetail }"
    class="relative w-full sm:w-auto sm:h-auto mt-8 rounded-none sm:mt-0 ml-0 text-bold"
    :data-simple-product="product.isSimpleProduct && !product.isOptionsProduct"
    @click="onAddToCart"
  >
    <slot>
      <template v-if="isEnabled && productDetail">
        <Spinner v-if="isLoading" class="absolute" />

        <h6 class="text-white p-0">PŘIDAT DO KOŠÍKA</h6>
        <img class="w-8 h-8 ml-3" :src="cartWhite" alt="Logo" />
      </template>

      <img v-else class="w-8 h-8" :src="cartWhite" alt="Logo" />
    </slot>
  </Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import injectProduct from '#ioc/composables/injectProduct'
import useAddToCart from '#ioc/services/useAddToCart'

import cartWhite from '#ioc/assets/images/cartWhite'
import Spinner from '#ioc/atoms/Spinner'
import useRouter from '#ioc/composables/useRouter'
import useLocalePath from '#ioc/composables/useLocalePath'
import { ref, computed } from 'vue'

const props = defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
  productDetail: {
    type: Boolean,
    default: false,
  },
})

const product = injectProduct()
const addToCart = useAddToCart()
const router = useRouter()
const localePath = useLocalePath()

const isLoading = ref(false)

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
    router.push(localePath(product.urlPath))
    return
  }
  isLoading.value = true

  try {
    await addToCart(product, {
      quantity: props.quantity,
      bundle: product.bundle,
      variantSku: product.variant?.sku,
      options: product.options,
    })
    product.options = []
    delete product.bundle
    product.configuration = {}
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
