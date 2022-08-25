import useDeleteCustomerAddressRepository from '#ioc/repositories/useDeleteCustomerAddressRepository'
import useToCustomerAddress from '#ioc/mappers/useToCustomerAddress'

export default () => {
  const deleteCustomerAddressRepository = useDeleteCustomerAddressRepository()

  return async (customerAddress: ReturnType<ReturnType<typeof useToCustomerAddress>>) => {
    return await deleteCustomerAddressRepository(customerAddress.id)
  }
}
