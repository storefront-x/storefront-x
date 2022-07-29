import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'
import SHOPWARE_SEARCH_LIMIT from '#ioc/config/SHOPWARE_SEARCH_LIMIT'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()

  return async (
    search: string,
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
  }> => {
    const searchResult = await shopware.post(`/search-suggest`, {
      limit: SHOPWARE_SEARCH_LIMIT,
      search,
    })

    return {
      products: searchResult.elements.map(toProduct) ?? [],
    }
  }
}
