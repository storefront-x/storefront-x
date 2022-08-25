import useGetCustomerOrdersRepository from '#ioc/repositories/useGetCustomerOrdersRepository'

export default () => {
  const getCustomerOrdersRepository = useGetCustomerOrdersRepository()

  return async (...args: Parameters<typeof getCustomerOrdersRepository>) => {
    return await getCustomerOrdersRepository(...args)
  }
}
