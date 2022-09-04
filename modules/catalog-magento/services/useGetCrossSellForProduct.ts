import useProduct from '#ioc/composables/useProduct'
import ToProduct from '#ioc/mappers/ToProduct'
import useGetProductCrossSellRepository from '#ioc/repositories/useGetProductCrossSellRepository'

export default () => {
  const getProductCrossSellRepository = useGetProductCrossSellRepository()

  return async (
    product: ReturnType<typeof useProduct>,
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const { products } = await getProductCrossSellRepository(product.sku)

    return {
      products,
    }
  }
}
