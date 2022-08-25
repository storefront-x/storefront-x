import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const placeOrderRepository = usePlaceOrderRepository()

  return async () => {
    const { id } = await getOrCreateCartId()

    const { order } = await placeOrderRepository(id)

    if (order.redirectUrl) {
      window.location.href = order.redirectUrl
      return
    }

    return order
  }
}
