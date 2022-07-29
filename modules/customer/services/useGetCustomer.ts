import useGetCustomerRepository from '#ioc/repositories/useGetCustomerRepository'

export default () => {
  const getCustomerRepository = useGetCustomerRepository()

  return async (...args: Parameters<typeof getCustomerRepository>) => {
    return await getCustomerRepository(...args)
  }
}
