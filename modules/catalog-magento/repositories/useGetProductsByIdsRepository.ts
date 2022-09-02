import ProductList from '#ioc/graphql/queries/ProductList'
import useMagento from '#ioc/composables/useMagento'
import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const magento = useMagento()
  const toProduct = useToProduct()

  return async (
    ids: string[],
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductList().with({
        skus: ids,
      }),
    )

    return {
      products: products.items.map(toProduct) || [],
    }
  }
}
