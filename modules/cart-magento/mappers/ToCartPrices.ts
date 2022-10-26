import ToCartDiscount from '#ioc/mappers/ToCartDiscount'
import ToCartTax from '#ioc/mappers/ToCartTax'
import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => {
  const selectedShippingMethod = data._shippingAddress?.available_shipping_methods.find(
    (method: any) => method.method_code === data._shippingAddress?.selected_shipping_method?.method_code,
  )

  return {
    grandTotal: ToMoney(data.grand_total),
    subtotalIncludingTax: ToMoney(data.subtotal_including_tax),
    subtotalExcludingTax: ToMoney(data.subtotal_excluding_tax),
    shippingIncludingTax: ToMoney(selectedShippingMethod?.price_incl_tax ?? {}),
    shippingExcludingTax: ToMoney(selectedShippingMethod?.price_excl_tax ?? {}),
    discounts: ((data.discounts as any[]) ?? []).map(ToCartDiscount),
    taxes: ((data.applied_taxes as any[]) ?? []).map(ToCartTax),
  }
}
