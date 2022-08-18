import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const toProduct = useToProduct()

  return (data: any) => ({
    id: data.id as string,
    quantity: data.quantity as number,
    product: toProduct(data.product),
  })
}
