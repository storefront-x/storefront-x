import Products from '#ioc/graphql/queries/Products'
import useMagento from '#ioc/composables/useMagento'
import useToProduct from '#ioc/mappers/useToProduct'
import transformFilterQuery from '#ioc/utils/magento/transformFilterQuery'
import transformSortQuery from '#ioc/utils/magento/transformSortQuery'
import buildAggregationFields from '#ioc/utils/magento/buildAggregationFields'
import fillAggregationsWithEmptySelectedOptions from '#ioc/utils/magento/fillAggregationsWithEmptySelectedOptions'
import fillAggregationsWithPossibleOptions from '#ioc/utils/magento/fillAggregationsWithPossibleOptions'
import useToAggregation from '#ioc/mappers/useToAggregation'

export default () => {
  const magento = useMagento()
  const toProduct = useToProduct()
  const toAggregation = useToAggregation()

  return async (
    { search, filter, currentPage = 1, pageSize = 5, sort } = {} as {
      search: string
      filter?: string[]
      currentPage?: number
      pageSize?: number
      sort?: string
    },
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
    aggregations: ReturnType<typeof toAggregation>[]
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
      products: products.items.map(toProduct) ?? [],
      aggregations: products.aggregations.map(toAggregation) ?? [],
      totalCount: products.total_count ?? 0,
    }
  }
}
