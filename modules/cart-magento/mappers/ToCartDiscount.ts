import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  amount: ToMoney(data.amount),
  label: data.label === ' ' ? data.label.trim() : data.label,
})
