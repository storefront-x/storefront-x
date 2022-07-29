import useGetShippingMethodsRepository from '#ioc/repositories/useGetShippingMethodsRepository'

export default () => {
  const getShippingMethodsRepository = useGetShippingMethodsRepository()

  return async (...args: Parameters<typeof getShippingMethodsRepository>) => {
    return await getShippingMethodsRepository(...args)
  }
}
