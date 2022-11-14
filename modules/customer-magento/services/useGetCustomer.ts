import useGetCustomerRepository from '#ioc/repositories/useGetCustomerRepository'

export default () => {
  const getCustomerRepository = useGetCustomerRepository()

  return async (): Promise<ReturnType<typeof getCustomerRepository>> => {
    return await getCustomerRepository()
  }
}
