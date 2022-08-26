import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()

  return (data: any) => ({
    amount: toMoney(data.amount),
    label: data.label as string,
  })
}
