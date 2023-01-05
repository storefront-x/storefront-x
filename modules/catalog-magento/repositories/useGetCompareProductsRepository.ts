import ProductCompareList from '#ioc/graphql/queries/ProductCompareList'
import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const magento = useMagento()

  return async (
    ids: string[],
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductCompareList().with({
        skus: ids,
      }),
    )

    return {
      products: products.items.map(ToProduct) || [],
    }
  }
}
