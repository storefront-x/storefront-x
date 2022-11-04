import ProductDetail from '#ioc/graphql/queries/ProductDetail'
import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'
import ToAggregation from '#ioc/mappers/ToAggregation'

export default () => {
  const magento = useMagento()

  return async (
    id: string,
  ): Promise<{
    product: ReturnType<typeof ToProduct>
    aggregations: ReturnType<typeof ToAggregation>[]
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductDetail().with({
        urlKey: id,
      }),
    )

    return {
      product: ToProduct(products?.items?.find((item: any) => item.url_key === id) || []),
      aggregations: products?.aggregations?.map(ToAggregation) || [],
    }
  }
}
