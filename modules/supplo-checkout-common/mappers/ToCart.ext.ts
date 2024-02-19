import ToShippingAddress from '#ioc/mappers/ToShippingAddress'
import ToMoney from '#ioc/mappers/ToMoney'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'
import ToReturnable from '#ioc/mappers/ToReturnable'
import ToOrderable from '#ioc/mappers/ToOrderable'

interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(ToCart: T): (...arg: any) => ReturnType<T> & Ext
}

interface ToCartType {
  shippingAddresses: ReturnType<typeof ToShippingAddress>
  shippingAddress: ReturnType<typeof ToShippingAddress> | null
  shippingPrice: ReturnType<typeof ToMoney>
  billingAddress: ReturnType<typeof ToShippingAddress> | null
  selectedShippingMethod: ReturnType<typeof ToShippingMethod> | null
  availableShippingMethods: ReturnType<typeof ToShippingMethod>[]
  availablePaymentMethods: ReturnType<typeof ToPaymentMethod>[]
  selectedPaymentMethod: ReturnType<typeof ToPaymentMethod> | null
}

const ToCart: Extension<ToCartType> = (ToCart) => (data) => ({
  ...ToCart(data),
  shippingAddresses: data?.shipping_addresses.map(ToShippingAddress ?? {}) ?? [],
  shippingAddress: data?.shipping_addresses[0] ? ToShippingAddress(data.shipping_addresses[0]) : null,
  shippingPrice: ToMoney(data?.shipping_addresses[0]?.selected_shipping_method?.amount ?? { value: 0 }),
  billingAddress: data?.billing_address ? ToShippingAddress(data.billing_address) : null,
  selectedShippingMethod: data?.shipping_addresses[0]?.selected_shipping_method
    ? ToShippingMethod(data.shipping_addresses[0].selected_shipping_method)
    : null,
  availableShippingMethods: data?.shipping_addresses[0]?.available_shipping_methods.map(ToShippingMethod ?? {}) ?? null,
  availablePaymentMethods: data?.available_payment_methods.map(ToPaymentMethod ?? {}) ?? null,
  selectedPaymentMethod: data?.selected_payment_method?.code
    ? ToPaymentMethod(data.selected_payment_method.code)
    : null,
})

export default ToCart
