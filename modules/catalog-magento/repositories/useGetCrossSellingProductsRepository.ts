import useMagento from '#ioc/composables/useMagento'
import ProductCrossSell from '#ioc/graphql/mutations/ProductCrossSell'
import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const magento = useMagento()
  const toProduct = useToProduct()

  return async (
    sku: string,
  ): Promise<{
    crossSellProducts: ReturnType<typeof toProduct>
  }> => {
    const { data: response } = await magento.graphql(
      ProductCrossSell().with({
        sku,
      }),
    )

    return {
      crossSellProducts: response?.products?.items[0]?.crosssell_products.map(toProduct) || [],
    }
  }
}
