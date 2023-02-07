import useNotifyPriceDropsRepository from '#ioc/repositories/productAlerts/useNotifyPriceDropsRepository'

export default () => {
  const notifyPriceDropsRepository = useNotifyPriceDropsRepository()

  return async (productId: string) => {
    return await notifyPriceDropsRepository(productId)
  }
}
