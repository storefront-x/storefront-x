import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()

  return (data: any) => ({
    subtotalIncludingTax: toMoney({ value: data.rawTotal }),
    subtotalExcludingTax: toMoney({ value: data.netPrice }),
  })
}
