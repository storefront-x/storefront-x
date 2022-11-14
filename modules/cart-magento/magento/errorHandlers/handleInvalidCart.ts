import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import CartResetted from '#ioc/errors/CartResetted'
import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const cookies = useCookies()

  return async (error: any) => {
    if (error.message?.startsWith('Could not find a cart with ID') || error.message?.startsWith(`The cart isn't active.`)) {
      cookies.remove(MAGENTO_CART_COOKIE_NAME)
      cartMagentoStore.$patch({ cartId: '' })

      cartStore.$reset()

      throw new CartResetted()
    }
  }
}
