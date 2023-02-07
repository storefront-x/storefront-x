import useCartStore from '#ioc/stores/useCartStore'
import useGetCart from '#ioc/services/useGetCart'

export default () => {
  const cartStore = useCartStore()
  const getCart = useGetCart()

  return async () => {
    const cart = await getCart()

    cartStore.$patch(cart)
  }
}
