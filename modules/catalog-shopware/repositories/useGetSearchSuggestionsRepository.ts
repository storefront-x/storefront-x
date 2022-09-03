import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'
import CATALOG_SEARCH_SUGGEST_LIMIT from '#ioc/config/CATALOG_SEARCH_SUGGEST_LIMIT'

export default () => {
  const shopware = useShopware()

  return async (
    { search } = {} as { search: string },
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const searchResult = await shopware.post(`/search-suggest`, {
      limit: CATALOG_SEARCH_SUGGEST_LIMIT,
      search,
    })

    return {
      products: searchResult.elements.map(ToProduct) ?? [],
    }
  }
}
