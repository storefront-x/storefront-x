import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'
import useToShippingAddress from '#ioc/mappers/useToShippingAddress'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const toPaymentMethod = useToPaymentMethod()
  const toShippingMethod = useToShippingMethod()
  const toShippingAddress = useToShippingAddress()
  const toContactInformation = useToContactInformation()

  return (data: any) => ({
    paymentMethods: ((data.available_payment_methods ?? []) as any[]).map(toPaymentMethod),
    currentPaymentMethod: data.selected_payment_method?.code ? toPaymentMethod(data.selected_payment_method) : null,
    shippingMethods: ((data.shipping_addresses[0]?.available_shipping_methods ?? []) as any[]).map(toShippingMethod),
    currentShippingMethod: data.shipping_addresses[0]?.selected_shipping_method
      ? toShippingMethod(data.shipping_addresses[0].selected_shipping_method)
      : null,
    shippingAddress: data.shipping_addresses[0] ? toShippingAddress(data.shipping_addresses[0]) : null,
    contactInformation:
      data.email !== 'DUMMYDATA@DUMMYDATA.DUMMYDATA'
        ? toContactInformation({ email: data.email, ...data.billing_address })
        : null,
  })
}
