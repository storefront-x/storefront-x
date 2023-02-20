import useProductComparisonStore from '#ioc/stores/useProductComparisonStore'
import { computed, reactive, ref, onMounted, readonly } from 'vue'

export default () => {
  // Comparsion data are loaded on the client side. This can cause hydration mismatch (empty data on server vs data on client).
  // By guarding everything behind onMounted hook, we know that the current component was hydrated and can accept client data.
  const wasHydrated = ref(false)

  onMounted(() => {
    wasHydrated.value = true
  })

  const productComparisonStore = useProductComparisonStore()

  const isLoaded = computed(() => {
    if (!wasHydrated.value) return false

    return productComparisonStore.compareList !== undefined
  })

  const itemCount = computed(() => {
    if (!wasHydrated.value) return 0

    return productComparisonStore.compareList?.itemCount ?? 0
  })

  const items = computed(() => {
    if (!wasHydrated.value) return []

    return productComparisonStore.compareList?.items ?? []
  })

  const attributes = computed(() => {
    if (!wasHydrated.value) return []

    return productComparisonStore.compareList?.attributes ?? []
  })

  return reactive({
    _wasHydrated: readonly(wasHydrated),
    isLoaded,
    itemCount,
    items,
    attributes,
  })
}
