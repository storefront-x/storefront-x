import ToMoney from '#ioc/mappers/ToMoney'

export default (currency: string) => (data: any) => ({
  label: data.label || '',
  price: ToMoney({ value: data.price, currency }),
  quantity: data.quantity || 1,
  id: data.id || null,
})
