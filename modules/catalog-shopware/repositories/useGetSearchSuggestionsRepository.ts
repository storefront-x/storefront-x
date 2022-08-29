import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'
import CATALOG_SEARCH_SUGGEST_LIMIT from '#ioc/config/CATALOG_SEARCH_SUGGEST_LIMIT'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()

  return async (
    { search } = {} as { search: string },
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
  }> => {
    const searchResult = await shopware.post(`/search-suggest`, {
      limit: CATALOG_SEARCH_SUGGEST_LIMIT,
      search,
    })

    return {
      products: searchResult.elements.map(toProduct) ?? [],
    }
  }
}
