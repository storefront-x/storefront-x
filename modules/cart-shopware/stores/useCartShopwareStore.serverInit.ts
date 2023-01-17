import useCartStore from '#ioc/stores/useCartStore'
import useGetCart from '#ioc/services/useGetCart'

export default async () => {
  const cartStore = useCartStore()
  const getCart = useGetCart()

  const cart = await getCart()

  cartStore.$patch(cart)
}
