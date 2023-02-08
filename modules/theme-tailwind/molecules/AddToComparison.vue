<template>
  <button
    type="button"
    class="rounded-md flex items-center justify-center"
    :class="classes"
    data-cy="add-to-comparison"
    @click="ResolveAddProductToComparison"
  >
    <span class="sr-only">
      {{ t('compare') }}
    </span>
    <OutlineScale class="ml-2 mr-1" :class="outlineClasses" :fill="isCompared ? 'currentColor' : 'none'" />
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
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useRemoveProductFromComparison from '#ioc/services/useRemoveProductFromComparison'
import useComparison from '#ioc/composables/useComparison'

const props = defineProps({
  fillOnHover: {
    default: false,
    type: Boolean,
  },
  title: {
    type: String,
    default: '',
  },
})

const { t } = useI18n()
const addProductToComparison = useAddProductToComparison()
const removeProductFromComparison = useRemoveProductFromComparison()
const showSuccessNotification = useShowSuccessNotification()
const showErrorNotification = useShowErrorNotification()
const product = injectProduct()
const comparison = useComparison()

const isCompared = computed(() => {
  return comparison.items.some((item: ReturnType<typeof ToCompareItem>) => item.product.sku === product.sku)
})
const isComparisonListFull = computed(() => {
  return comparison.items.length >= 4
})

const outlineClasses = computed(() => {
  return props.fillOnHover
    ? [
        'lg:hover:stroke-primary-500',
        '!w-4',
        '!h-4',
        'md:!w-6',
        'md:!h-6',
        'transition',
        'duration-150',
        'ease-in-out',
        'lg:hover:scale-125',
      ]
    : []
})

const classes = computed(() => {
  return {
    'fill-on-hover': props.fillOnHover,
    'text-gray-400 hover:text-gray-500': !isCompared.value,
    'text-primary-500 hover:text-primary-800': isCompared.value,
    'hover:bg-gray-100': !props.fillOnHover,
  }
})

const ResolveAddProductToComparison = async () => {
  if (isCompared.value) {
    await removeProductFromComparison(product)
    showSuccessNotification('', t('productRemoved'))
    return
  }

  if (isComparisonListFull.value) {
    showErrorNotification(t('tooManyProducts'))
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
  tooManyProducts: You have too many products in comparison. Please remove some.
cs-CZ:
  compare: Srovnat produkty
  productRemoved: Produkt byl úspěšně odebrán ze srovnání.
  productAdded: Produkt byl úspěšně přidán.
  tooManyProducts: Máte příliš mnoho produktů ve srovnání, prosím odeberte nějaký.
</i18n>
