import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import CartResetted from '#ioc/errors/CartResetted'
import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import isNoSuchEntityError from '#ioc/utils/graphql/isNoSuchEntityError'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const cookies = useCookies()

  return async (error: any) => {
    if (isNoSuchEntityError(error)) {
      cookies.remove(MAGENTO_CART_COOKIE_NAME)
      cartMagentoStore.$patch({ cartId: '' })

      cartStore.$reset()

      throw new CartResetted()
    }
  }
}
