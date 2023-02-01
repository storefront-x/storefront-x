import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  amount: ToMoney(data.amount),
  label: String(data.label ?? '').trim(),
})
