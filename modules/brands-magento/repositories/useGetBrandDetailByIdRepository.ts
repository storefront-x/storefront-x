import useMagento from '#ioc/composables/useMagento'
import BrandDetail from '#ioc/graphql/queries/BrandDetail'
import ToBrand from '#ioc/mappers/ToBrand'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'
import transformSortQuery from '#ioc/utils/magento/transformSortQuery'
import transformFilterQuery from '#ioc/utils/magento/transformFilterQuery'
import ToProduct from '#ioc/mappers/ToProduct'
import ToAggregation from '#ioc/mappers/ToAggregation'
import CATALOG_FILTER_ATTRIBUTES_HIDDEN from '#ioc/config/magento/CATALOG_FILTER_ATTRIBUTES_HIDDEN'

interface BrandOptions {
  page?: number
  sort?: any
  filter?: any
}

export default () => {
  const magento = useMagento()

  return async (
    id: string,
    { page = 1, sort, filter }: BrandOptions = {},
  ): Promise<{
    brand: ReturnType<typeof ToBrand>
    products: ReturnType<typeof ToProduct>[]
    aggregations: ReturnType<typeof ToAggregation>[]
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
      brand: ToBrand(data.amBrandById),
      products: data.products.items.map(ToProduct),
      aggregations: data.aggregations.aggregations
        .map(ToAggregation)
        .filter((aggregation: any) => !CATALOG_FILTER_ATTRIBUTES_HIDDEN.includes(aggregation.attributeCode)),
      totalCount: data.products.total_count ?? 0,
    }
  }
}
