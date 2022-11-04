import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import recursive from '#ioc/utils/composables/recursive'
import CartError from '#ioc/errors/CartError'
import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useGetCartByIdRepository from '#ioc/repositories/useGetCartByIdRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'

export default recursive(() => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const getCartByIdRepository = useGetCartByIdRepository()
  const cookies = useCookies()
  return async (error: any) => {
    if (error?.extensions?.category === 'graphql-no-such-entity') {
      cookies.remove(MAGENTO_CART_COOKIE_NAME)
      cartMagentoStore.$patch({ cartId: '' })

      const { id } = await getOrCreateCartId()
      const { cart } = await getCartByIdRepository(id)

      cartStore.$patch({ cart })
      throw new CartError()
    }
  }
})
