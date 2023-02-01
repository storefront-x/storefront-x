import useCartStore from '#ioc/stores/useCartStore'
import { computed, reactive, ref, onMounted } from 'vue'

export default () => {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  const cartStore = useCartStore()

  const isLoaded = computed(() => {
    if (!isMounted.value) return false

    return cartStore.cart !== undefined
  })

  const items = computed(() => {
    if (!isMounted.value) return []

    return cartStore.cart?.items ?? []
  })

  const itemsTotalQuantity = computed(() => {
    if (!isMounted.value) return 0

    let itemsTotalQuantity = 0

    for (const item of items.value) {
      itemsTotalQuantity += item.quantity
    }

    return itemsTotalQuantity
  })

  const subtotalIncludingTax = computed(() => {
    if (!isMounted.value) return null

    return cartStore.cart?.prices.subtotalIncludingTax ?? null
  })

  const taxes = computed(() => {
    if (!isMounted.value) return []

    return cartStore.cart?.prices.taxes ?? []
  })

  const discounts = computed(() => {
    if (!isMounted.value) return []

    return cartStore.cart?.prices.discounts ?? []
  })

  const coupons = computed(() => {
    if (!isMounted.value) return []

    return cartStore.cart?.coupons ?? []
  })

  const grandTotal = computed(() => {
    if (!isMounted.value) return null

    return cartStore.cart?.prices.grandTotal ?? null
  })

  return reactive({
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
