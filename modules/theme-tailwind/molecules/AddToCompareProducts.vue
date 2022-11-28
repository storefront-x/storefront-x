<template>
  <button
    type="button"
    class="rounded-md flex items-center text-gray-400 justify-center"
    :class="classes"
    data-cy="compare-products"
    @click="add"
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
import { defineComponent, inject } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import useAddComparedProducts from '#ioc/services/useAddComparedProducts'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

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
    const Product = inject('$Product')
    return {
      t,
      addComparedProducts,
      showErrorNotification,
      Product,
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
  },
})
</script>

<i18n lang="yaml">
cs-CZ:
  Compare products: Srovnat produkty
</i18n>
