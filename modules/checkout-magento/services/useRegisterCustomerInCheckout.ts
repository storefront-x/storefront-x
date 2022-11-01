import useRegisterCustomerRepository from '#ioc/repositories/useRegisterCustomerRepository'

export default () => {
  const registerCustomerRepository = useRegisterCustomerRepository()

  return async (data: Parameters<typeof registerCustomerRepository>[0]) => {
    await registerCustomerRepository(data)
  }
}
