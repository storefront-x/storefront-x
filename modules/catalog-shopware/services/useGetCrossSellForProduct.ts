import useProduct from '#ioc/composables/useProduct'
import ToProduct from '#ioc/mappers/ToProduct'
import useGetCrossSellingsRepository from '#ioc/repositories/useGetCrossSellingsRepository'

export default () => {
  const getCrossSellingsRepository = useGetCrossSellingsRepository()

  return async (
    product: ReturnType<typeof useProduct>,
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const { products } = await getCrossSellingsRepository(product.id)

    return {
      products,
    }
  }
}
