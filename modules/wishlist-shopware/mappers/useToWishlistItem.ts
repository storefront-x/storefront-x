import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const toProduct = useToProduct()

  return (data: any) => ({
    id: data.id,
    product: toProduct(data),
  })
}
