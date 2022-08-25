import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const toPaymentMethod = useToPaymentMethod()
  const toShippingMethod = useToShippingMethod()
  const toContactInformation = useToContactInformation()

  return (data: any) => ({
    paymentMethods: ((data.cart.available_payment_methods ?? []) as any[]).map(toPaymentMethod),
    currentPaymentMethod: data.cart.selected_payment_method?.code
      ? toPaymentMethod(data.cart.selected_payment_method)
      : null,
    shippingMethods: ((data.cart.shipping_addresses[0]?.available_shipping_methods ?? []) as any[]).map(
      toShippingMethod,
    ),
    currentShippingMethod: data.cart.shipping_addresses[0]?.selected_shipping_method
      ? toShippingMethod(data.cart.shipping_addresses[0].selected_shipping_method)
      : null,
    contactInformation: data.cart.email
      ? toContactInformation({ email: data.cart.email, ...data.cart.billing_address })
      : null,
  })
}
