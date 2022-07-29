import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'
import useToCategorySorting from '#ioc/mappers/useToCategorySorting'
import useToAggregation from '#ioc/mappers/useToAggregation'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()
  const toCategorySorting = useToCategorySorting()
  const toAggregation = useToAggregation()

  return async (
    query: string,
    opts: { page: number; sort?: string; filter?: string[] },
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
    totalCount: number
    sortings: ReturnType<typeof toCategorySorting>[]
    aggregations: ReturnType<typeof toAggregation>[]
  }> => {
    const getOrder = () => {
      if (opts.sort) {
        const [field, order] = opts.sort.split(',')

        return `${field}-${order}`.toLowerCase()
      } else {
        return undefined
      }
    }

    const getProperties = () => {
      return opts.filter?.map((ids) => ids.split(',').slice(1)).flat()
    }

    const searchResult = await shopware.post(`/search`, {
      search: query,
      limit: CATALOG_PAGE_SIZE,
      order: getOrder(),
      properties: getProperties(),
    })

    return {
      products: searchResult.elements.map(toProduct) ?? [],
      totalCount: searchResult.total ?? 0,
      sortings: searchResult.availableSortings.map(toCategorySorting) ?? [],
      aggregations: searchResult.aggregations?.properties?.entities?.map(toAggregation) ?? [],
    }
  }
}
