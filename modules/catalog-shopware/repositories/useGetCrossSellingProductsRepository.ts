import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()

  return async (
    productId: string,
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
  }> => {
    const response = await shopware.post(`/product/${productId}/cross-selling`)

    return {
      products: response.length ? response[0].products.map(toProduct) : [],
    }
  }
}
