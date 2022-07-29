import useGetCurrentShippingMethodRepository from '#ioc/repositories/useGetCurrentShippingMethodRepository'

export default () => {
  const getCurrentShippingMethodRepository = useGetCurrentShippingMethodRepository()

  return async (...args: Parameters<typeof getCurrentShippingMethodRepository>) => {
    return await getCurrentShippingMethodRepository(...args)
  }
}
