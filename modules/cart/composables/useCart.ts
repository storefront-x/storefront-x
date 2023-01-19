import useCartStore from '#ioc/stores/useCartStore'
import { computed, reactive } from 'vue'

export default () => {
  const cartStore = useCartStore()

  const items = computed(() => cartStore.cart?.items ?? [])

  const itemsTotalQuantity = computed(() => {
    let itemsTotalQuantity = 0

    for (const item of items.value) {
      itemsTotalQuantity += item.quantity
    }

    return itemsTotalQuantity
  })

  const subtotalIncludingTax = computed(() => cartStore.cart?.prices.subtotalIncludingTax)

  const taxes = computed(() => cartStore.cart?.prices.taxes ?? [])

  const discounts = computed(() => cartStore.cart?.prices.discounts ?? [])

  const coupons = computed(() => cartStore.cart?.coupons ?? [])

  const grandTotal = computed(() => cartStore.cart?.prices.grandTotal)

  return reactive({
    items,
    itemsTotalQuantity,
    subtotalIncludingTax,
    taxes,
    discounts,
    coupons,
    grandTotal,
  })
}
