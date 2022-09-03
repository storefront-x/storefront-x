import useShopware from '#ioc/composables/useShopware'
import ToCategory from '#ioc/mappers/ToCategory'
import ToProduct from '#ioc/mappers/ToProduct'
import ToCategorySorting from '#ioc/mappers/ToCategorySorting'
import ToAggregation from '#ioc/mappers/ToAggregation'
import CATALOG_PAGE_SIZE from '#ioc/config/CATALOG_PAGE_SIZE'

export default () => {
  const shopware = useShopware()

  return async (
    id: string,
    opts: { page: number; sort?: string; filter?: string[] },
  ): Promise<{
    category: ReturnType<typeof ToCategory>
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

    const [category, productListing] = await Promise.all([
      shopware.post(`/category/${id}`),
      shopware.post(`/product-listing/${id}`, {
        p: opts.page,
        limit: CATALOG_PAGE_SIZE,
        order: getOrder(),
        properties: getProperties(),
      }),
    ])

    return {
      category: ToCategory(category),
      products: productListing.elements.map(ToProduct) ?? [],
      totalCount: productListing.total ?? 0,
      sortings: productListing.availableSortings.map(ToCategorySorting) ?? [],
      aggregations: productListing.aggregations?.properties?.entities?.map(ToAggregation) ?? [],
    }
  }
}
