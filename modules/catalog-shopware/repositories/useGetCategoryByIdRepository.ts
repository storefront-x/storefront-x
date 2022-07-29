import useShopware from '#ioc/composables/useShopware'
import useToCategory from '#ioc/mappers/useToCategory'
import useToProduct from '#ioc/mappers/useToProduct'
import useToCategorySorting from '#ioc/mappers/useToCategorySorting'
import useToAggregation from '#ioc/mappers/useToAggregation'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

export default () => {
  const shopware = useShopware()
  const toCategory = useToCategory()
  const toProduct = useToProduct()
  const toCategorySorting = useToCategorySorting()
  const toAggregation = useToAggregation()

  return async (
    id: string,
    opts: { page: number; sort?: string; filter?: string[] },
  ): Promise<{
    category: ReturnType<typeof toCategory>
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

    const [category, productListing] = await Promise.all([
      shopware.post(`/category/${id}`, {}),
      shopware.post(`/product-listing/${id}`, {
        p: opts.page,
        limit: CATALOG_PAGE_SIZE,
        order: getOrder(),
        properties: getProperties(),
      }),
    ])

    return {
      category: toCategory(category),
      products: productListing.elements.map(toProduct) ?? [],
      totalCount: productListing.total ?? 0,
      sortings: productListing.availableSortings.map(toCategorySorting) ?? [],
      aggregations: productListing.aggregations?.properties?.entities?.map(toAggregation) ?? [],
    }
  }
}
