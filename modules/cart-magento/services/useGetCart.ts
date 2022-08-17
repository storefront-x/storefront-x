import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'
import useToCart from '#ioc/mappers/useToCart'
import useGetCartByIdRepository from '../repositories/useGetCartByIdRepository'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '../config/MAGENTO_CART_COOKIE_NAME'

export default () => {
  const cookies = useCookies()
  const createEmptyCartRepository = useCreateEmptyCartRepository()
  const getCartByIdRepository = useGetCartByIdRepository()

  return async (): Promise<{
    cart: ReturnType<ReturnType<typeof useToCart>>
  }> => {
    let id = cookies.get(MAGENTO_CART_COOKIE_NAME)

    if (!id) {
      const cart = await createEmptyCartRepository()
      id = cart.id
      cookies.set(MAGENTO_CART_COOKIE_NAME, id)
    }

    const { cart } = await getCartByIdRepository(id)

    return {
      cart,
    }
  }
}
