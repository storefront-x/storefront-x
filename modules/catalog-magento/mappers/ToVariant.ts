import ToProduct from '#ioc/mappers/ToProduct'
import reduce from '#ioc/utils/reduce'

export default (data: any) => ({
  product: ToProduct(data.product),
  attributes: reduce(
    data.attributes,
    ({ code }: any) => code,
    ({ value_index }) => value_index,
  ),
})
