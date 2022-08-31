import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const cookies = useCookies()
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const placeOrderRepository = usePlaceOrderRepository()

  return async () => {
    const { id } = await getOrCreateCartId()

    const { order } = await placeOrderRepository(id)

    cookies.remove(MAGENTO_CART_COOKIE_NAME)

    cartStore.$reset()
    checkoutStore.$reset()

    return {
      order,
    }
  }
}
