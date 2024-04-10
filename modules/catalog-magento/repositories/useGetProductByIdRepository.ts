import ProductDetail from '#ioc/graphql/queries/ProductDetail'
import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const magento = useMagento()

  return async (
    sku: string,
  ): Promise<{
    product: ReturnType<typeof ToProduct>
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductDetail().with({
        sku,
      }),
    )

    return {
      product: ToProduct(products?.items?.find((item: any) => item.sku === sku) || []),
    }
  }
}
