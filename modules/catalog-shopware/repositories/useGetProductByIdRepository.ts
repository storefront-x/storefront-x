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
    const [product, crossSelling] = await Promise.all([
      shopware.post(`/product/${id}`),
      shopware.post(`/product/${id}/cross-selling`),
    ])
    const productWithCrossSelling = { ...(product?.product ?? {}), crossSelling: crossSelling[0].products ?? {} }

    return {
      product: toProduct(productWithCrossSelling),
    }
  }
}
