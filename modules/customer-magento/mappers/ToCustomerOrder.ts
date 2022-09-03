import toDate from '#ioc/utils/date/toDate'
import ToMoney from '#ioc/mappers/ToMoney'
import ToCustomerOrderItem from '#ioc/mappers/ToCustomerOrderItem'

export default (data: any) => ({
  id: data.id ?? '',
  number: data.number ?? '',
  orderDate: toDate(data.order_date) ?? '',
  status: data.status ?? '',
  carrier: data.carrier ?? '',
  shippingMethod: data?.shipping_method ?? '',
  items: data?.items.map(ToCustomerOrderItem) ?? [],
  shippingAddress: toOrderAddress(data?.shipping_address) ?? null,
  billingAddress: toOrderAddress(data?.billing_address) ?? null,
  paymentMethods: data?.payment_methods.map(toPaymentMethod) ?? [],
  total: toOrderTotal(data?.total) ?? null,
})

const toOrderTotal = (data: any) => ({
  baseGrandTotal: ToMoney(data?.base_grand_total) ?? null,
  grandTotal: ToMoney(data?.grand_total) ?? null,
  subtotal: ToMoney(data?.subtotal) ?? null,
  totalShipping: ToMoney(data?.total_shipping) ?? null,
  taxes: data?.taxes.map(toTaxItem) ?? [],
  shippingHandling: toShippingHandling(data?.shipping_handling) ?? null,
  discounts: data?.discounts.map(toDiscountItem) ?? [],
})

const toShippingHandling = (data: any) => ({
  taxes: data?.taxes.map(toTaxItem) ?? null,
  amountIncludingTax: ToMoney(data?.amount_including_tax.value) ?? 0,
  amountExcludingTax: ToMoney(data?.amount_excluding_tax.value) ?? 0,
  totalAmount: ToMoney(data?.total_amount.value) ?? 0,
})

const toDiscountItem = (data: any) => ({
  amount: ToMoney(data?.amount) ?? null,
  label: data?.label ?? '',
})

const toTaxItem = (data: any) => ({
  amount: ToMoney(data?.amount) ?? null,
  rate: ToMoney(data?.rate) ?? 0,
  title: data?.title ?? '',
})

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
