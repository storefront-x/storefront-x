import useToCartDiscount from '#ioc/mappers/useToCartDiscount'
import useToCartTax from '#ioc/mappers/useToCartTax'
import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()
  const toCartDiscount = useToCartDiscount()
  const toCartTax = useToCartTax()

  return (data: any) => ({
    grandTotal: toMoney(data.grand_total),
    subtotalIncludingTax: toMoney(data.subtotal_including_tax),
    subtotalExcludingTax: toMoney(data.subtotal_excluding_tax),
    shippingIncludingTax: null,
    shippingExcludingTax: null,
    discounts: ((data.discounts as any[]) ?? []).map(toCartDiscount),
    taxes: ((data.applied_taxes as any[]) ?? []).map(toCartTax),
  })
}
