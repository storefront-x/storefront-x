import useCookies from '#ioc/composables/useCookies'
import useCreateEmptyCartRepository from '#ioc/repositories/useCreateEmptyCartRepository'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'

export default () => {
  const cookies = useCookies()
  const createEmptyCartRepository = useCreateEmptyCartRepository()

  return async (): Promise<{
    id: string
  }> => {
    const id = cookies.get(MAGENTO_CART_COOKIE_NAME)
    if (id) return { id }

    {
      const { id } = await createEmptyCartRepository()
      cookies.set(MAGENTO_CART_COOKIE_NAME, id)

      return { id }
    }
  }
}
