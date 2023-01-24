import ToCartDiscount from '#ioc/mappers/ToCartDiscount'
import ToCartTax from '#ioc/mappers/ToCartTax'
import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  grandTotal: ToMoney(data.grand_total ?? {}),
  subtotalIncludingTax: ToMoney(data.subtotal_including_tax),
  subtotalExcludingTax: ToMoney(data.subtotal_excluding_tax),
  shippingIncludingTax: null,
  shippingExcludingTax: null,
  discounts: ((data.discounts as any[]) ?? []).map(ToCartDiscount),
  taxes: ((data.applied_taxes as any[]) ?? []).map(ToCartTax),
})
