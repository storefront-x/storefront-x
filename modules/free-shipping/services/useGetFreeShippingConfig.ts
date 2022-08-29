import useGetFreeShippingConfigRepository from '#ioc/repositories/useGetFreeShippingConfigRepository'

export default () => {
  const getFreeShippingConfigRepository = useGetFreeShippingConfigRepository()

  return async (...args: Parameters<typeof getFreeShippingConfigRepository>) => {
    return await getFreeShippingConfigRepository(...args)
  }
}
