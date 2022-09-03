import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'
import ToCategorySorting from '#ioc/mappers/ToCategorySorting'
import ToAggregation from '#ioc/mappers/ToAggregation'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

export default () => {
  const shopware = useShopware()

  return async (
    query: string,
    opts: { page: number; sort?: string; filter?: string[] },
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
    totalCount: number
    sortings: ReturnType<typeof ToCategorySorting>[]
    aggregations: ReturnType<typeof ToAggregation>[]
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
      products: searchResult.elements.map(ToProduct) ?? [],
      totalCount: searchResult.total ?? 0,
      sortings: searchResult.availableSortings.map(ToCategorySorting) ?? [],
      aggregations: searchResult.aggregations?.properties?.entities?.map(ToAggregation) ?? [],
    }
  }
}
