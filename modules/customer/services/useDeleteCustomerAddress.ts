import useDeleteCustomerAddressRepository from '#ioc/repositories/useDeleteCustomerAddressRepository'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

export default () => {
  const deleteCustomerAddressRepository = useDeleteCustomerAddressRepository()

  return async (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
    return await deleteCustomerAddressRepository(customerAddress.id)
  }
}
