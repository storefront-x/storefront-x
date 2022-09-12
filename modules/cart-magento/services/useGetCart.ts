import ToCart from '#ioc/mappers/ToCart'
import useGetCartByIdRepository from '#ioc/repositories/useGetCartByIdRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const getCartByIdRepository = useGetCartByIdRepository()
  const cookies = useCookies()
  const cartStore = useCartStore()

  return async (): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { id } = await getOrCreateCartId()

    try {
      const { cart } = await getCartByIdRepository(id)

      return {
        cart,
      }
    } catch (e: any) {
      if (e.data.category === 'graphql-no-such-entity') {
        cookies.remove(MAGENTO_CART_COOKIE_NAME)
        cartStore.$patch({ cartId: '' })

        const { id } = await getOrCreateCartId()

        const { cart } = await getCartByIdRepository(id)

        return {
          cart,
        }
      } else {
        console.error(e)
        throw e
      }
    }
  }
}
