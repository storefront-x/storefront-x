import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const shopware = useShopware()

  return async (
    id: string,
  ): Promise<{
    product: any
  }> => {
    const [product, crossSelling] = await Promise.all([
      shopware.post(`/product/${id}`),
      shopware.post(`/product/${id}/cross-selling`),
    ])

    const productWithCrossSelling = { ...(product?.product ?? {}), crossSell: crossSelling[0]?.products ?? [] }

    return {
      product: ToProduct(productWithCrossSelling),
    }
  }
}
