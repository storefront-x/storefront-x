import ToMoney from '#ioc/mappers/ToMoney'

export default (data: any) => ({
  id: data.id as string,
  orderNumber: data.orderNumber as string,
  amountTotal: ToMoney({ value: data.amountTotal }),
  orderDate: data.orderDate as string,
})
