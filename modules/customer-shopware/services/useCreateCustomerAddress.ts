import useCreateCustomerAddressRepository from '#ioc/repositories/useCreateCustomerAddressRepository'

export default () => {
  const createCustomerAddressRepository = useCreateCustomerAddressRepository()

  return async (...args: Parameters<typeof createCustomerAddressRepository>) => {
    return await createCustomerAddressRepository(...args)
  }
}
