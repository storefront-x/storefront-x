<template>
  <button
    type="button"
    class="rounded-md flex items-center justify-center"
    :class="classes"
    data-cy="compare-products"
    @click="addToComparison"
  >
    <span class="sr-only">
      {{ t('compare') }}
    </span>
    <OutlineScale class="ml-2 mr-1" />
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
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'

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
const showSuccessNotification = useShowSuccessNotification()
const compareProductsStore = useCompareProductsStore()
const product = injectProduct()

const isSelected = computed(() => {
  return compareProductsStore.items.some((item: ReturnType<typeof ToCompareItem>) => item.product.sku === product.sku)
})

const classes = computed(() => {
  return {
    'text-gray-400 hover:text-gray-800': !isSelected.value,
    'text-gray-700 hover:text-gray-800': isSelected.value,
  }
})

const addToComparison = async () => {
  if (isSelected.value) {
    showSuccessNotification('', t('productAlreadyAdded'))
    return
  }
  await addProductToComparison(product)
  showSuccessNotification('', t('productAdded'))
}
</script>

<i18n lang="yaml">
en-US:
  compare: Compare products
  productAlreadyAdded: Product has been already added for comparison.
  productAdded: Product has been added successfully.
cs-CZ:
  compare: Srovnat produkty
  productAlreadyAdded: Produkt již byl přidán ke srovnání.
  productAdded: Produkt byl úspěšně přidán.
</i18n>
