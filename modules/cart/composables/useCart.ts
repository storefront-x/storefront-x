import useCartStore from '#ioc/stores/useCartStore'
import { computed, reactive } from 'vue'

export default () => {
  const cartStore = useCartStore()

  const items = computed(() => cartStore.items)

  const itemsTotalQuantity = computed(() => {
    let itemsTotalQuantity = 0

    for (const item of items.value) {
      itemsTotalQuantity += item.quantity
    }

    return itemsTotalQuantity
  })

  const prices = computed(() => cartStore.prices)

  return reactive({
    items,
    itemsTotalQuantity,
    prices,
  })
}
