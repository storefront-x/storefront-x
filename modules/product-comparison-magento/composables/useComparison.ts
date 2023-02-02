import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import { computed, reactive, ref, onMounted, readonly } from 'vue'

export default () => {
  // Comparsion data are loaded on the client side. This can cause hydration mismatch (empty data on server vs data on client).
  // By guarding everything behind onMounted hook, we know that the current component was hydrated and can accept client data.
  const wasHydrated = ref(false)

  onMounted(() => {
    wasHydrated.value = true
  })

  const productComparisonMagentoStore = useProductComparisonMagentoStore()

  const isLoaded = computed(() => {
    if (!wasHydrated.value) return false

    return true
  })

  const comparisonListId = computed(() => {
    if (!wasHydrated.value) return ''
    return productComparisonMagentoStore?.compareList?.comparisonListId ?? ''
  })

  const itemCount = computed(() => {
    if (!wasHydrated.value) return 0
    return productComparisonMagentoStore?.compareList?.itemCount ?? 0
  })

  const items = computed(() => {
    if (!wasHydrated.value) return []
    return productComparisonMagentoStore?.compareList?.items ?? []
  })

  const attributes = computed(() => productComparisonMagentoStore?.compareList?.attributes ?? [])

  return reactive({
    _wasHydrated: readonly(wasHydrated),
    isLoaded,
    comparisonListId,
    itemCount,
    items,
    attributes,
  })
}
