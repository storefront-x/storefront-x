import useToShippingMethod from '#ioc/mappers/useToShippingMethod'
import useSetShippingMethodOnCartRepository from '#ioc/repositories/useSetShippingMethodOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setShippingMethodOncartRepository = useSetShippingMethodOnCartRepository()

  return async (shippingMethod: ReturnType<ReturnType<typeof useToShippingMethod>>) => {
    const { id } = await getOrCreateCartId()

    const checkout = await setShippingMethodOncartRepository(id, shippingMethod)

    checkoutStore.$patch(checkout)
  }
}
