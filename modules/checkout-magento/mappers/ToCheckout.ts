import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default (data: any) => ({
  paymentMethods: ((data.available_payment_methods ?? []) as any[]).map(ToPaymentMethod),
  shippingMethods: ((data.shipping_addresses[0]?.available_shipping_methods ?? []) as any[]).map(ToShippingMethod),
})
