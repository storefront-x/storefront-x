import useGetCustomerRepository from '#ioc/repositories/useGetCustomerRepository'

export default () => {
  const getCustomerRepository = useGetCustomerRepository()

  return async (id: string): Promise<ReturnType<typeof getCustomerRepository>> => {
    if (id) {
      try {
        return await getCustomerRepository()
      } catch (error) {
        console.error(error)
        throw error
      }
    } else {
      return {
        customer: null,
      }
    }
  }
}
