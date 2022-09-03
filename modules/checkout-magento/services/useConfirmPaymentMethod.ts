import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
import useSetPaymentMethodOnCartRepository from '#ioc/repositories/useSetPaymentMethodOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setPaymentMethodOnCartRepository = useSetPaymentMethodOnCartRepository()

  return async (paymentMethod: ReturnType<typeof ToPaymentMethod>) => {
    const { id } = await getOrCreateCartId()

    const { checkout } = await setPaymentMethodOnCartRepository(id, paymentMethod)

    checkoutStore.$patch(checkout)
  }
}
