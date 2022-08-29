import useGetCrossSellingProductsRepository from '#ioc/repositories/useGetCrossSellingProductsRepository'

export default () => {
  const getCrossSellingProducts = useGetCrossSellingProductsRepository()

  return async (sku: string) => {
    const { crossSellProducts } = await getCrossSellingProducts(sku)

    return crossSellProducts
  }
}
