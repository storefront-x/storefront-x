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

  const grandTotal = computed(() => cartStore.cart?.prices.grandTotal)

  const subtotalIncludingTax = computed(() => cartStore.cart?.prices.subtotalIncludingTax)

  const taxes = computed(() => cartStore.cart?.prices.taxes ?? [])

  const discounts = computed(() => cartStore.cart?.prices.discounts ?? [])

  return reactive({
    items,
    itemsTotalQuantity,
    grandTotal,
    subtotalIncludingTax,
    taxes,
    discounts,
  })
}
