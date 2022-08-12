import useWishlistStore from '#ioc/stores/useWishlistStore'
import { computed, reactive } from 'vue'

export default () => {
  const wishlistStore = useWishlistStore()

  const items = computed(() => wishlistStore.items)

  const wishlistQuantity = computed(() => items.value.length)

  return reactive({
    items,
    wishlistQuantity,
  })
}
