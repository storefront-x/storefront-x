import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import { computed, reactive } from 'vue'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()

  const items = computed(() => productComparisonMagentoStore.items ?? [])

  const attributes = computed(() => productComparisonMagentoStore.attributes ?? [])

  return reactive({
    items,
    attributes,
  })
}
