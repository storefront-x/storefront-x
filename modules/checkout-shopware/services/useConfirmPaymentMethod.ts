import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useGetCartRepository from '#ioc/repositories/useGetCartRepository'
import useSetCurrentPaymentMethodRepository from '#ioc/repositories/useSetCurrentPaymentMethodRepository'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const setCurrentPaymentMethodRepository = useSetCurrentPaymentMethodRepository()
  const getCatCartRepository = useGetCartRepository()

  return async (paymentMethod: ReturnType<ReturnType<typeof useToPaymentMethod>>) => {
    await setCurrentPaymentMethodRepository(paymentMethod)
    const { cart } = await getCatCartRepository()

    cartStore.$patch({ cart })
    checkoutStore.$patch({ paymentMethod })
  }
}
