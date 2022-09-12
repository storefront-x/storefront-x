import useCookies from '#ioc/composables/useCookies'
import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cookies = useCookies()
  const createEmptyCartRepository = useCreateEmptyCartRepository()
  const cartStore = useCartStore()

  return async (): Promise<{
    id: string
  }> => {
    const id = cartStore.cartId
    if (id) return { id }

    {
      const { id } = await createEmptyCartRepository()
      cookies.set(MAGENTO_CART_COOKIE_NAME, id)

      cartStore.$patch({ cartId: id })

      return { id }
    }
  }
}
