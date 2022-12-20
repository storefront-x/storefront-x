import ProductDetail from '#ioc/graphql/queries/ProductDetail'
import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const magento = useMagento()

  return async (
    id: string,
  ): Promise<{
    product: ReturnType<typeof ToProduct>
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductDetail().with({
        urlKey: id,
      }),
    )

    return {
      product: ToProduct(products?.items?.find((item: any) => item.url_key === id) || []),
    }
  }
}
