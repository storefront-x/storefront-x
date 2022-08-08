import useDeleteCustomerAddressRepository from '#ioc/repositories/useDeleteCustomerAddressRepository'

export default () => {
  const deleteCustomerAddressRepository = useDeleteCustomerAddressRepository()

  return async (...args: Parameters<typeof deleteCustomerAddressRepository>) => {
    return await deleteCustomerAddressRepository(...args)
  }
}
