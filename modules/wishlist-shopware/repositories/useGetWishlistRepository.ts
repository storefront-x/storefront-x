import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'
import ShopwareError from '@storefront-x/shopware/ShopwareError'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()

  return async (): Promise<{
    products: ReturnType<typeof toProduct>[]
    _errors: ShopwareError[]
  }> => {
    try {
      const response = await shopware.post(`/customer/wishlist`)

      return {
        products: response.products?.elements?.map(toProduct) ?? [],
        _errors: (response.errors ?? []).map((err: any) => new ShopwareError(err)),
      }
    } catch {
      return {
        products: [],
        _errors: [],
      }
    }
  }
}
