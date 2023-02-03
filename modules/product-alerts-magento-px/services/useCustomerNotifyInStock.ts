import useCustomerNotifyInStockRepository from '#ioc/repositories/useCustomerNotifyInStockRepository'

export default () => {
  const customerNotifyInStockRepository = useCustomerNotifyInStockRepository()

  return async (...args: Parameters<typeof customerNotifyInStockRepository>) => {
    return await customerNotifyInStockRepository(...args)
  }
}
