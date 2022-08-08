import useUpdateCustomerAddressRepository from '#ioc/repositories/useUpdateCustomerAddressRepository'

export default () => {
  const updateCustomerAddressRepository = useUpdateCustomerAddressRepository()

  return async (...args: Parameters<typeof updateCustomerAddressRepository>) => {
    return await updateCustomerAddressRepository(...args)
  }
}
