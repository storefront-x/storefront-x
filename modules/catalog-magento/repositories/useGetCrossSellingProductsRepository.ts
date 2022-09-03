import useMagento from '#ioc/composables/useMagento'
import ProductCrossSell from '#ioc/graphql/mutations/ProductCrossSell'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const magento = useMagento()

  return async (
    sku: string,
  ): Promise<{
    crossSellProducts: ReturnType<typeof ToProduct>
  }> => {
    const { data: response } = await magento.graphql(
      ProductCrossSell().with({
        sku,
      }),
    )

    return {
      crossSellProducts: response?.products?.items[0]?.crosssell_products.map(ToProduct) || [],
    }
  }
}
