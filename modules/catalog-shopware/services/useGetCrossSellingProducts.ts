import useGetCrossSellingProduct from '#ioc/repositories/useGetCrossSellingProductsRepository'

export default () => {
  const getCrossSellingProduct = useGetCrossSellingProduct()

  return async (...args: Parameters<typeof getCrossSellingProduct>) => {
    return await getCrossSellingProduct(...args)
  }
}
