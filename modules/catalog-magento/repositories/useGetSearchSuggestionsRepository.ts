import Products from '#ioc/graphql/queries/Products'
import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'
import transformFilterQuery from '#ioc/utils/magento/transformFilterQuery'
import transformSortQuery from '#ioc/utils/magento/transformSortQuery'
import buildAggregationFields from '#ioc/utils/magento/buildAggregationFields'
import fillAggregationsWithEmptySelectedOptions from '#ioc/utils/magento/fillAggregationsWithEmptySelectedOptions'
import fillAggregationsWithPossibleOptions from '#ioc/utils/magento/fillAggregationsWithPossibleOptions'
import ToAggregation from '#ioc/mappers/ToAggregation'

export default () => {
  const magento = useMagento()

  return async (
    { search, filter, currentPage = 1, pageSize = 5, sort } = {} as {
      search: string
      filter?: string[]
      currentPage?: number
      pageSize?: number
      sort?: string
    },
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
    aggregations: ReturnType<typeof ToAggregation>[]
    totalCount: number
  }> => {
    const _filter = transformFilterQuery(filter)
    const {
      data: { products, ...rest },
    } = await magento.graphql(
      Products()
        .fields(buildAggregationFields(_filter, search))
        .with({
          search,
          pageSize,
          currentPage,
          sort: transformSortQuery(sort),
          filter: _filter,
        }),
    )

    fillAggregationsWithPossibleOptions(products.aggregations, rest, _filter)
    fillAggregationsWithEmptySelectedOptions(products.aggregations, rest, _filter)

    return {
      products: products.items.map(ToProduct) ?? [],
      aggregations: products.aggregations.map(ToAggregation) ?? [],
      totalCount: products.total_count ?? 0,
    }
  }
}
