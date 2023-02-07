import useNotifyInStockRepository from '#ioc/repositories/productAlerts/useNotifyInStockRepository'

export default () => {
  const notifyInStockRepository = useNotifyInStockRepository()

  return async (productId: string) => {
    return await notifyInStockRepository(productId)
  }
}
