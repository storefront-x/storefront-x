import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  code: data.method_code ? `${data.carrier_code}_${data.method_code}` : data.carrier_code,
  carrierCode: data.carrier_code as string,
  carrierTitle: data.carrier_title as string,
  methodCode: data.method_code as string | null,
  methodTitle: data.method_title as string | null,
  priceExclTax: ToMoney(data.price_excl_tax),
  priceInclTax: ToMoney(data.price_incl_tax),
})
