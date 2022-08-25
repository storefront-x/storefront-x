import useGetCustomerCartIdRepository from '#ioc/repositories/useGetCustomerCartIdRepository'

export default () => {
  const getCustomerCartIdRepository = useGetCustomerCartIdRepository()

  return async () => {
    const { id } = await getCustomerCartIdRepository()

    return { id }
  }
}
