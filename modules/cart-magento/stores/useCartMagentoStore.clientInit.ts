import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useGetCart from '#ioc/services/useGetCart'
import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const getCart = useGetCart()
  const cartTokenIdent = useCartTokenIdent()

  return async () => {
    const id = localStorage.getItem(cartTokenIdent)

    if (!id) return

    cartMagentoStore.$patch({ cartId: id })

    const cart = await getCart()

    cartStore.$patch(cart)
  }
}
