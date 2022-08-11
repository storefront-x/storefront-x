import ProductDetail from '#ioc/graphql/queries/ProductDetail'
import useMagento from '#ioc/composables/useMagento'
import useToProduct from '#ioc/mappers/useToProduct'
import useToAggregation from '#ioc/mappers/useToAggregation'

export default () => {
  const magento = useMagento()
  const toProduct = useToProduct()
  const toAggregation = useToAggregation()

  return async (
    id: string,
  ): Promise<{
    product: ReturnType<typeof toProduct>
    aggregations: ReturnType<typeof toAggregation>[]
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductDetail().with({
        urlKey: id,
      }),
    )

    return {
      product: toProduct(products.items.find((item: any) => item.url_key === id)),
      aggregations: products.aggregations.map(toAggregation) || [],
    }
  }
}
