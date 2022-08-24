import useUpdateCustomerAddressRepository from '#ioc/repositories/useUpdateCustomerAddressRepository'
import useToCustomerAddress from '#ioc/mappers/useToCustomerAddress'

export default () => {
  const updateCustomerAddressRepository = useUpdateCustomerAddressRepository()

  return async (customerAddress: ReturnType<ReturnType<typeof useToCustomerAddress>>) => {
    return await updateCustomerAddressRepository({
      ...customerAddress,
      region: { region_id: customerAddress.regionId },
    })
  }
}
