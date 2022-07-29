import useShopware from '#ioc/composables/useShopware'
import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()

  return async (
    id: string,
  ): Promise<{
    product: ReturnType<typeof toProduct>
  }> => {
    const response = await shopware.post(`/product/${id}`)

    return {
      product: toProduct(response.product),
    }
  }
}
