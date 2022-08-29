import toDate from '#ioc/utils/date/toDate'
import useToMoney from '#ioc/mappers/useToMoney'
import useToCustomerOrderItem from '#ioc/mappers/useToCustomerOrderItem'

export default () => {
  const toOrderItem = useToCustomerOrderItem()
  return (data: any) => ({
    id: data.id ?? '',
    number: data.number ?? '',
    orderDate: toDate(data.order_date) ?? '',
    status: data.status ?? '',
    carrier: data.carrier ?? '',
    shippingMethod: data?.shipping_method ?? '',
    items: data?.items.map(toOrderItem) ?? [],
    shippingAddress: toOrderAddress(data?.shipping_address) ?? null,
    billingAddress: toOrderAddress(data?.billing_address) ?? null,
    paymentMethods: data?.payment_methods.map(toPaymentMethod) ?? [],
    total: toOrderTotal(data?.total) ?? null,
  })
}

const toOrderTotal = (data: any) => {
  const toMoney = useToMoney()
  return {
    baseGrandTotal: toMoney(data?.base_grand_total) ?? null,
    grandTotal: toMoney(data?.grand_total) ?? null,
    subtotal: toMoney(data?.subtotal) ?? null,
    totalShipping: toMoney(data?.total_shipping) ?? null,
    taxes: data?.taxes.map(toTaxItem) ?? [],
    shippingHandling: toShippingHandling(data?.shipping_handling) ?? null,
    discounts: data?.discounts.map(toDiscountItem) ?? [],
  }
}

const toShippingHandling = (data: any) => {
  const toMoney = useToMoney()
  return {
    taxes: data?.taxes.map(toTaxItem) ?? null,
    amountIncludingTax: toMoney(data?.amount_including_tax.value) ?? 0,
    amountExcludingTax: toMoney(data?.amount_excluding_tax.value) ?? 0,
    totalAmount: toMoney(data?.total_amount.value) ?? 0,
  }
}

const toDiscountItem = (data: any) => {
  const toMoney = useToMoney()
  return {
    amount: toMoney(data?.amount) ?? null,
    label: data?.label ?? '',
  }
}

const toTaxItem = (data: any) => {
  const toMoney = useToMoney()
  return {
    amount: toMoney(data?.amount) ?? null,
    rate: toMoney(data?.rate) ?? 0,
    title: data?.title ?? '',
  }
}

const toPaymentMethod = (data: any) => ({
  name: data?.name ?? '',
  type: data?.type ?? '',
})

const toOrderAddress = (data: any) => ({
  prefix: data?.prefix ?? '',
  firstname: data?.firstname ?? '',
  lastname: data?.lastname ?? '',
  suffix: data?.suffix ?? '',

  city: data?.city ?? '',
  company: data?.company ?? '',
  countryCode: data?.country_code ?? '',
  fax: data?.fax ?? '',
  postcode: data?.postcode ?? '',
  region: data?.region ?? '',
  regionId: data?.aaa ?? 0,
  street: data?.street ?? '',
  telephone: data?.telephone ?? '',
})
