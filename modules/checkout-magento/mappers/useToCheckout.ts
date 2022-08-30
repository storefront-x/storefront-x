import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const toPaymentMethod = useToPaymentMethod()
  const toShippingMethod = useToShippingMethod()
  const toContactInformation = useToContactInformation()

  return (data: any) => ({
    paymentMethods: ((data.available_payment_methods ?? []) as any[]).map(toPaymentMethod),
    shippingMethods: ((data.shipping_addresses[0]?.available_shipping_methods ?? []) as any[]).map(toShippingMethod),
    contactInformation: toContactInformation({ email: data.email, ...data.billing_address }),
  })
}
