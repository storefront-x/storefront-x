import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useGetCart from '#ioc/services/useGetCart'
import useCartToken from '#ioc/composables/useCartToken'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const getCart = useGetCart()
  const cartToken = useCartToken()

  return async () => {
    const id = cartToken.get()

    if (!id) return

    cartMagentoStore.$patch({ cartId: id })

    const cart = await getCart()

    cartStore.$patch(cart)
  }
}
