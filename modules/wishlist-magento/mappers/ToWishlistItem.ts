import ToProduct from '#ioc/mappers/ToProduct'

export default (data: any) => ({
  id: data.id,
  product: ToProduct(data.product),
})
