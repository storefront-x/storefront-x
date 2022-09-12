import useCookies from '#ioc/composables/useCookies'
import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const cookies = useCookies()
  const createEmptyCartRepository = useCreateEmptyCartRepository()
  const cartMagentoStore = useCartMagentoStore()

  return async (): Promise<{
    id: string
  }> => {
    const id = cartMagentoStore.cartId
    if (id) return { id }

    {
      const { id } = await createEmptyCartRepository()
      cookies.set(MAGENTO_CART_COOKIE_NAME, id)

      cartMagentoStore.$patch({ cartId: id })

      return { id }
    }
  }
}
