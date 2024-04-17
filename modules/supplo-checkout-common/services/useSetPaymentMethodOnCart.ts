import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
import useSetPaymentMethodOnCartRepository from '#ioc/repositories/useSetPaymentMethodOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const setPaymentMethodOnCartRepository = useSetPaymentMethodOnCartRepository()
  const cartStore = useCartStore()

  return async (paymentMethod: ReturnType<typeof ToPaymentMethod>) => {
    const { id } = await getOrCreateCartId()
    const { cart } = await setPaymentMethodOnCartRepository(id, paymentMethod)

    cartStore.$patch({ cart })
  }
}
