import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  subtotalIncludingTax: ToMoney({ value: data.rawTotal }),
  subtotalExcludingTax: ToMoney({ value: data.netPrice }),
})
