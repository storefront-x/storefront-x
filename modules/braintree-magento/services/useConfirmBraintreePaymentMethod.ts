import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useSetBraintreePaymentMethodOnCartRepository from '#ioc/repositories/useSetBraintreePaymentMethodOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

interface Options {
  nonce: string
}

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setPaymentMethodOnCartRepository = useSetBraintreePaymentMethodOnCartRepository()

  return async (paymentMethod: ReturnType<ReturnType<typeof useToPaymentMethod>>, options: Options) => {
    const { id } = await getOrCreateCartId()

    const { checkout } = await setPaymentMethodOnCartRepository(id, paymentMethod, options)

    checkoutStore.$patch(checkout)
  }
}
