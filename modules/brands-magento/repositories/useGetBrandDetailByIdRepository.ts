import useMagento from '#ioc/composables/useMagento'
import BrandDetail from '#ioc/graphql/queries/BrandDetail'
import useToBrand from '#ioc/mappers/useToBrand'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'
import transformSortQuery from '#ioc/utils/magento/transformSortQuery'
import transformFilterQuery from '#ioc/utils/magento/transformFilterQuery'
import useToProduct from '#ioc/mappers/useToProduct'
import useToAggregation from '#ioc/mappers/useToAggregation'

interface BrandOptions {
  page?: number
  sort?: any
  filter?: any
}

export default () => {
  const magento = useMagento()
  const toBrand = useToBrand()
  const toProduct = useToProduct()
  const toAggregation = useToAggregation()

  return async (
    id: string,
    { page = 1, sort, filter }: BrandOptions = {},
  ): Promise<{
    brand: ReturnType<typeof toBrand>
    products: ReturnType<typeof toProduct>[]
    aggregations: ReturnType<typeof toAggregation>[]
    totalCount: number
  }> => {
    const { data } = await magento.graphql(
      BrandDetail().with({
        id,
        manufacturer: id,
        pageSize: CATALOG_PAGE_SIZE,
        currentPage: page || 1,
        sort: transformSortQuery(sort),
        filter: {
          manufacturer: { eq: id },
          ...transformFilterQuery(filter),
        },
      }),
    )

    return {
      brand: toBrand(data.amBrandById),
      products: data.products.items.map(toProduct),
      aggregations: data.aggregations.aggregations.map(toAggregation) || [],
      totalCount: data.products.total_count ?? 0,
    }
  }
}
