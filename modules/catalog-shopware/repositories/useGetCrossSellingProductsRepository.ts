import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const shopware = useShopware()

  return async (
    productId: string,
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const response = await shopware.post(`/product/${productId}/cross-selling`)

    return {
      products: response.length ? response[0].products.map(ToProduct) : [],
    }
  }
}
