<template>
  <button
    type="button"
    class="rounded-md flex items-center justify-center"
    :class="classes"
    data-cy="compare-products"
    @click="ResolveAddProductToComparison"
  >
    <span class="sr-only">
      {{ t('compare') }}
    </span>
    <OutlineScale class="ml-2 mr-1" :fill="isCompared ? 'currentColor' : 'none'" />
    <span class="ml-1">
      {{ title }}
    </span>
  </button>
</template>

<script setup lang="ts">
import OutlineScale from '#ioc/icons/OutlineScale'
import { computed } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import injectProduct from '#ioc/composables/injectProduct'
import useAddProductToComparison from '#ioc/services/useAddProductToComparison'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useRemoveProductFromComparison from '#ioc/services/useRemoveProductFromComparison'

defineProps({
  title: {
    type: String,
    default: '',
  },
  blackOnHover: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
const addProductToComparison = useAddProductToComparison()
const removeComparedProducts = useRemoveProductFromComparison()
const showSuccessNotification = useShowSuccessNotification()
const productComparisonMagentoStore = useProductComparisonMagentoStore()
const product = injectProduct()

const isCompared = computed(() => {
  return productComparisonMagentoStore.items.some(
    (item: ReturnType<typeof ToCompareItem>) => item.product.sku === product.sku,
  )
})

const classes = computed(() => {
  return {
    'text-gray-400 hover:text-gray-800': !isCompared.value,
    'text-gray-700 hover:text-gray-800': isCompared.value,
  }
})

const ResolveAddProductToComparison = async () => {
  if (isCompared.value) {
    await removeComparedProducts(product)
    showSuccessNotification('', t('productRemoved'))
    return
  }
  await addProductToComparison(product)
  showSuccessNotification('', t('productAdded'))
}
</script>

<i18n lang="yaml">
en-US:
  compare: Compare products
  productRemoved: Product has been successfully removed from comparison.
  productAdded: Product has been successfully added.
cs-CZ:
  compare: Srovnat produkty
  productRemoved: Produkt byl úspěšně odebrán ze srovnání.
  productAdded: Produkt byl úspěšně přidán.
</i18n>
