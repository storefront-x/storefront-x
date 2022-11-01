import usePlaceOrderRepository from '#ioc/repositories/usePlaceOrderRepository'
import useLocalePath from '#ioc/composables/useLocalePath'
import useCustomer from '#ioc/composables/useCustomer'
import useRegisterGuestRepository from '#ioc/repositories/useRegisterGuestRepository'
import useCheckout from '#ioc/composables/useCheckout'

export default () => {
  const customer = useCustomer()
  const checkout = useCheckout()
  const placeOrderRepository = usePlaceOrderRepository()
  const localePath = useLocalePath()
  const registerGuestRepository = useRegisterGuestRepository()

  return async () => {
    if (!customer.isLoggedIn) {
      await registerGuestRepository({
        contactInformation: checkout.contactInformation!,
      })
    }

    const { order } = await placeOrderRepository()

    window.location.href = localePath({
      name: 'thank-you',
      query: {
        orderNumber: order.orderNumber,
      },
    })
  }
}
