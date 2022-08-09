import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()

  return (data: any) => ({
    id: data.id as string,
    orderNumber: data.orderNumber as string,
    amountTotal: toMoney({ value: data.amountTotal }),
    orderDate: data.orderDate as string,
  })
}
