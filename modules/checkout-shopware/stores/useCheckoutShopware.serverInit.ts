import useGetCurrentPaymentMethod from '#ioc/services/useGetCurrentPaymentMethod'
import useGetCurrentShippingMethod from '#ioc/services/useGetCurrentShippingMethod'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useGetPaymentMethods from '#ioc/services/useGetPaymentMethods'
import useGetShippingMethods from '#ioc/services/useGetShippingMethods'

export default async () => {
  const checkoutStore = useCheckoutStore()
  const getPaymentMethods = useGetPaymentMethods()
  const getShippingMethods = useGetShippingMethods()
  const getCurrentPaymentMethod = useGetCurrentPaymentMethod()
  const getCurrentShippingMethod = useGetCurrentShippingMethod()

  const [{ paymentMethods }, { shippingMethods }, { currentPaymentMethod }, { currentShippingMethod }] =
    await Promise.all([
      getPaymentMethods(),
      getShippingMethods(),
      getCurrentPaymentMethod(),
      getCurrentShippingMethod(),
    ])

  checkoutStore.$patch({
    paymentMethods,
    shippingMethods,
    currentPaymentMethod,
    currentShippingMethod,
  })
}
