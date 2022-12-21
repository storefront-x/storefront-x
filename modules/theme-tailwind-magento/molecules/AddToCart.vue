<template>
  <Button
    color="primary"
    :disabled="loading"
    data-cy="add-to-cart"
    class="relative w-full sm:w-auto sm:h-auto mt-4 sm:mt-0 sm:ml-3 text-bold"
    :data-simple-product="product.isSimpleProduct && !product.productOptions.length"
    @click="onAddToCart"
  >
    <slot>
      <span v-if="!loading">{{ t('Add to cart') }}</span>
      <Spinner v-if="loading" />
    </slot>

    <BundleOptionsModal v-if="isBundleModalOpen" @close="isBundleModalOpen = false" @add-to-cart="onAddToCart" />

    <ProductOptionsModal v-if="isOptionsModalOpen" @close="isOptionsModalOpen = false" @add-to-cart="onAddToCart" />

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
import BundleOptionsModal from '#ioc/organisms/BundleOptionsModal'
import ProductOptionsModal from '#ioc/organisms/ProductOptionsModal'
import useRouter from '#ioc/composables/useRouter'
import useRoute from '#ioc/composables/useRoute'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

const props = defineProps({
  quantity: {
    type: Number,
    default: 1,
  },
})

const { t } = useI18n()
const product = injectProduct()
const addToCart = useAddToCart()
const router = useRouter()
const route = useRoute()
const showErrorNotification = useShowErrorNotification()

const loading = ref(false)
const isCrossSellModalOpen = ref(false)
const isBundleModalOpen = ref(false)
const isOptionsModalOpen = ref(false)

const onClose = () => {
  isCrossSellModalOpen.value = false
}

const onAddToCart = async () => {
  if (product.isConfigurableProduct && !product.isConfigured) {
    if (route.fullPath === product.urlPath) {
      showErrorNotification(t('Please configure your product'))
      return
    } else {
      router.push(product.urlPath)
      return
    }
  }

  if (product.isBundleProduct && !product.isBundleConfigured) {
    isBundleModalOpen.value = true
    return
  }

  if (product.productOptions.length > 0 && !product.isOptionsConfigured) {
    isOptionsModalOpen.value = true
    return
  }

  loading.value = true

  try {
    await addToCart(product, {
      quantity: props.quantity,
      bundle: product.bundle,
      variantSku: product.variant?.sku,
      options: product.options,
    })
    isCrossSellModalOpen.value = true
    product.options = []
    delete product.bundle
  } finally {
    loading.value = false
    isBundleModalOpen.value = false
    isOptionsModalOpen.value = false
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Add to cart: Přidat do košíku
  Please configure your product: Nakonfigurujte svůj produkt
</i18n>
