import useCartStore from '#ioc/stores/useCartStore'
import { computed, reactive, ref, onMounted, readonly } from 'vue'

export default () => {
  // Cart data are loaded on the client side. This can cause hydration mismatch (empty cart on server vs cart data on client).
  // By guarding everything behind onMounted hook, we know that the current component was hydrated and can accept client data.
  const wasHydrated = ref(false)

  onMounted(() => {
    wasHydrated.value = true
  })

  const cartStore = useCartStore()

  const isLoaded = computed(() => {
    if (!wasHydrated.value) return false

    return cartStore.cart !== undefined
  })

  const items = computed(() => {
    if (!wasHydrated.value) return []

    return cartStore.cart?.items ?? []
  })

  const itemsTotalQuantity = computed(() => {
    if (!wasHydrated.value) return 0

    let itemsTotalQuantity = 0

    for (const item of items.value) {
      itemsTotalQuantity += item.quantity
    }

    return itemsTotalQuantity
  })

  const subtotalIncludingTax = computed(() => {
    if (!wasHydrated.value) return null

    return cartStore.cart?.prices.subtotalIncludingTax ?? null
  })

  const taxes = computed(() => {
    if (!wasHydrated.value) return []

    return cartStore.cart?.prices.taxes ?? []
  })

  const discounts = computed(() => {
    if (!wasHydrated.value) return []

    return cartStore.cart?.prices.discounts ?? []
  })

  const coupons = computed(() => {
    if (!wasHydrated.value) return []

    return cartStore.cart?.coupons ?? []
  })

  const grandTotal = computed(() => {
    if (!wasHydrated.value) return null

    return cartStore.cart?.prices.grandTotal ?? null
  })

  return reactive({
    _wasHydrated: readonly(wasHydrated),
    isLoaded,
    items,
    itemsTotalQuantity,
    subtotalIncludingTax,
    taxes,
    discounts,
    coupons,
    grandTotal,
  })
}
