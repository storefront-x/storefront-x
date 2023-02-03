import useCustomerNotifyPriceDropsRepository from '#ioc/repositories/useCustomerNotifyPriceDropsRepository'

export default () => {
  const customerNotifyPriceDropsRepository = useCustomerNotifyPriceDropsRepository()

  return async (...args: Parameters<typeof customerNotifyPriceDropsRepository>) => {
    return await customerNotifyPriceDropsRepository(...args)
  }
}
