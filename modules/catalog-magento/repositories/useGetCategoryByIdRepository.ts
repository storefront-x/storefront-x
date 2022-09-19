import useMagento from '#ioc/composables/useMagento'
import ToCategory from '#ioc/mappers/ToCategory'
import ToProduct from '#ioc/mappers/ToProduct'
import buildAggregationFields from '#ioc/utils/magento/buildAggregationFields'
import fillAggregationsWithEmptySelectedOptions from '#ioc/utils/magento/fillAggregationsWithEmptySelectedOptions'
import fillAggregationsWithPossibleOptions from '#ioc/utils/magento/fillAggregationsWithPossibleOptions'
import transformFilterQuery from '#ioc/utils/magento/transformFilterQuery'
import transformSortQuery from '#ioc/utils/magento/transformSortQuery'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'
import CategoryDetail from '#ioc/graphql/queries/CategoryDetail'
import ToAggregation from '#ioc/mappers/ToAggregation'
import CATALOG_FILTER_ATTRIBUTES_HIDDEN from '../config/magento/CATALOG_FILTER_ATTRIBUTES_HIDDEN'

interface CategoryOptions {
  page?: number
  pageSize?: number
  filter?: any
  sort?: any
}

export default () => {
  const magento = useMagento()

  return async (
    id: string,
    { page = 1, pageSize, filter, sort }: CategoryOptions = {},
  ): Promise<{
    category: ReturnType<typeof ToCategory>
    products: ReturnType<typeof ToProduct>[]
    aggregations: ReturnType<typeof ToAggregation>[]
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
        category: ToCategory(categoryList[0]) ?? [],
        products: products.items.map(ToProduct) ?? [],
        aggregations: aggregations.aggregations
          .map(ToAggregation)
          .filter((aggregation: any) => !CATALOG_FILTER_ATTRIBUTES_HIDDEN.includes(aggregation.attributeCode)),
        totalCount: products.total_count ?? 0,
      }
    } catch (e) {
      console.error(e)

      return {
        category: ToCategory([]),
        products: [],
        aggregations: [],
        totalCount: 0,
      }
    }
  }
}
