import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import CartResetted from '#ioc/errors/CartResetted'
import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const cookies = useCookies()

  const errorMessages = ['Could not find a cart with ID', `The cart isn't active`]

  return async (error: any) => {
    for (const message of errorMessages) {
      if (error.message?.includes(message)) {
        cookies.remove(MAGENTO_CART_COOKIE_NAME)
        cartMagentoStore.$patch({ cartId: '' })

        cartStore.$reset()

        throw new CartResetted()
      }
    }
  }
}
