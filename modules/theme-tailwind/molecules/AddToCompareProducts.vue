<template>
  <button
    type="button"
    class="rounded-md flex items-center text-gray-400 justify-center"
    data-cy="compare-products"
    @click="resolveAddToCompare"
  >
    <span class="sr-only">
      {{ t('Compare products') }}
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
import injectProduct from '#ioc/composables/injectProduct'
import useAddComparedProducts from '#ioc/services/useAddComparedProducts'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'

defineProps({
  title: {
    type: String,
    default: '',
  },
})

const { t } = useI18n()
const addComparedProducts = useAddComparedProducts()
const showErrorNotification = useShowErrorNotification()
const showSuccessNotification = useShowSuccessNotification()
const compareProductsStore = useCompareProductsStore()
const product = injectProduct()

const isSelected = computed(() => {
  return compareProductsStore.items.some((item) => item === product.sku)
})

const add = async () => {
  try {
    await addComparedProducts(product)
  } catch (error) {
    showErrorNotification(error)
  }
}
const resolveAddToCompare = async () => {
  if (!isSelected.value) {
    await add()
    showSuccessNotification('', t('Product has been added successfully.'))
  } else {
    showSuccessNotification('', t('Product has been already added.'))
  }
}
</script>

<i18n lang="yaml">
cs-CZ:
  Compare products: Srovnat produkty
  Product has been already added for comparison.: Produkt již byl přidán ke srovnání.
  Product has been added successfully.: Produkt byl úspěšně přidán.
</i18n>
