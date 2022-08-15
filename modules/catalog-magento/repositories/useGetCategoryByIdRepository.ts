import useMagento from '#ioc/composables/useMagento'
import useToCategory from '#ioc/mappers/useToCategory'
import useToProduct from '#ioc/mappers/useToProduct'
import buildAggregationFields from '#ioc/utils/magento/buildAggregationFields'
import fillAggregationsWithEmptySelectedOptions from '#ioc/utils/magento/fillAggregationsWithEmptySelectedOptions'
import fillAggregationsWithPossibleOptions from '#ioc/utils/magento/fillAggregationsWithPossibleOptions'
import transformFilterQuery from '#ioc/utils/magento/transformFilterQuery'
import transformSortQuery from '#ioc/utils/magento/transformSortQuery'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'
import CategoryDetail from '#ioc/graphql/queries/CategoryDetail'
import useToAggregation from '#ioc/mappers/useToAggregation'
import CATALOG_FILTER_ATTRIBUTES_HIDDEN from '../config/magento/CATALOG_FILTER_ATTRIBUTES_HIDDEN'

interface CategoryOptions {
  page?: number
  pageSize?: number
  filter?: any
  sort?: any
}

export default () => {
  const magento = useMagento()
  const toCategory = useToCategory()
  const toProduct = useToProduct()
  const toAggregation = useToAggregation()

  return async (
    id: string,
    { page = 1, pageSize, filter, sort }: CategoryOptions = {},
  ): Promise<{
    category: ReturnType<typeof toCategory>
    products: ReturnType<typeof toProduct>[]
    aggregations: ReturnType<typeof toAggregation>[]
    totalCount: number
  }> => {
    try {
      const filterWithCategoryId = {
        category_uid: { eq: id },
        ...transformFilterQuery(filter),
      }
      const {
        data: { categoryList, products, aggregations, ...rest },
      } = await magento.graphql(
        CategoryDetail()
          .fields(buildAggregationFields(filterWithCategoryId, ''))
          .with({
            id,
            pageSize: pageSize || CATALOG_PAGE_SIZE,
            currentPage: page,
            sort: transformSortQuery(sort),
            filter: filterWithCategoryId,
          }),
      )

      fillAggregationsWithPossibleOptions(aggregations.aggregations, rest, filterWithCategoryId)
      fillAggregationsWithEmptySelectedOptions(aggregations.aggregations, rest, filterWithCategoryId)

      return {
        category: toCategory(categoryList[0]) ?? [],
        products: products.items.map(toProduct) ?? [],
        aggregations: aggregations.aggregations
          .map(toAggregation)
          .filter((aggregation: any) => !CATALOG_FILTER_ATTRIBUTES_HIDDEN.includes(aggregation.attributeCode)),
        totalCount: products.total_count ?? 0,
      }
    } catch (e) {
      console.error(e)

      return {
        category: toCategory([]),
        products: [],
        aggregations: [],
        totalCount: 0,
      }
    }
  }
}
