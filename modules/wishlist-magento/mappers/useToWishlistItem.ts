import useToProduct from '#ioc/mappers/useToProduct'

interface Data {
  id: string
  product: ReturnType<ReturnType<typeof useToProduct>>
}

export default () => (data: Data) => ({
  id: data.product.sku,
  product: data.product,
})
