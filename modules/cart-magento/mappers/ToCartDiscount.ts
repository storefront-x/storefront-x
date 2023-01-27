import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  amount: ToMoney(data.amount),
  label: (data.label !== ' ' && (data.label as string)) || ('' as string),
})
