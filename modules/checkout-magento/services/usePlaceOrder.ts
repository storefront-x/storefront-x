import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'

export default () => {
  const cookies = useCookies()
  const getOrCreateCartId = useGetOrCreateCartId()
  const placeOrderRepository = usePlaceOrderRepository()

  return async () => {
    const { id } = await getOrCreateCartId()

    const { order } = await placeOrderRepository(id)

    cookies.remove(MAGENTO_CART_COOKIE_NAME)

    if (order.redirectUrl) {
      window.location.href = order.redirectUrl
    }

    return {
      order,
    }
  }
}
