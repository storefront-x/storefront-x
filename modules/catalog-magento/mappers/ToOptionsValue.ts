import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  id: data.uid,
  optionId: data.option_type_id,
  finalPrice: ToMoney({ value: data.price }),
  priceType: data.price_type,
  sku: data.sku,
  title: data.title,
})
