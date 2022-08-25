import useToMoney from '#ioc/mappers/useToMoney'
import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const toMoney = useToMoney()
  const toProduct = useToProduct()

  return (data: any) => ({
    id: data.id as string,
    price: toMoney(data.prices.price),
    rowTotal: toMoney(data.prices.row_total),
    quantity: data.quantity as number,
    product: toProduct(data.product),
    stackable: true,
  })
}
