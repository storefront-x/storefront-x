import useGetCustomerOrdersRepository from '#ioc/repositories/useGetCustomerOrdersRepository'

export default () => {
  const getGetCustomerOrdersRepository = useGetCustomerOrdersRepository()

  return async (...args: Parameters<typeof getGetCustomerOrdersRepository>) => {
    return await getGetCustomerOrdersRepository(...args)
  }
}
