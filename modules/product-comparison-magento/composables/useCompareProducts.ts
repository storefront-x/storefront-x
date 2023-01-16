import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import { computed, reactive } from 'vue'

export default () => {
  const compareProductsStore = useCompareProductsStore()

  const items = computed(() => compareProductsStore.items ?? [])

  const attributes = computed(() => compareProductsStore.attributes ?? [])

  return reactive({
    items,
    attributes,
  })
}
