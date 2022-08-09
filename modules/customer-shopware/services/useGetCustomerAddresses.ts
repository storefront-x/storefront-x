import useGetCustomerAddressesRepository from '#ioc/repositories/useGetCustomerAddressesRepository'

export default () => {
  const getCustomerAddressRepository = useGetCustomerAddressesRepository()

  return async (...args: Parameters<typeof getCustomerAddressRepository>) => {
    return await getCustomerAddressRepository(...args)
  }
}
