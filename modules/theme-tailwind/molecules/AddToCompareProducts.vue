<template>
  <button
    type="button"
    class="rounded-md flex items-center text-gray-400 justify-center"
    :class="classes"
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

<script>
import OutlineScale from '#ioc/icons/OutlineScale'
import { defineComponent, inject, ref } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import useAddComparedProducts from '#ioc/services/useAddComparedProducts'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'

export default defineComponent({
  components: {
    OutlineScale,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { t } = useI18n()
    const addComparedProducts = useAddComparedProducts()
    const showErrorNotification = useShowErrorNotification()
    const showSuccessNotification = useShowSuccessNotification()
    const compareProductsStore = useCompareProductsStore()
    const Product = inject('$Product')
    const selected = ref(compareProductsStore.items.some((item) => item === Product.sku))

    return {
      t,
      addComparedProducts,
      showErrorNotification,
      Product,
      showSuccessNotification,
      selected,
    }
  },

  methods: {
    async add() {
      try {
        await this.addComparedProducts(this.Product)
      } catch (error) {
        this.showErrorNotification(error)
      }
    },
    async resolveAddToCompare() {
      if (!this.selected) {
        this.add()
      } else {
        this.showSuccessNotification('', this.t('Product has been already added.'))
      }
    },
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Compare products: Srovnat produkty
  Product has been already added.: Produkt už byl přidán
</i18n>
