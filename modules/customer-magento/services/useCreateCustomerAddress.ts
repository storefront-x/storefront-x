import useCreateCustomerAddressRepository from '#ioc/repositories/useCreateCustomerAddressRepository'
import useToCustomerAddress from '#ioc/mappers/useToCustomerAddress'

export default () => {
  const createCustomerAddressRepository = useCreateCustomerAddressRepository()

  return async (customerAddress: ReturnType<ReturnType<typeof useToCustomerAddress>>) => {
    return await createCustomerAddressRepository({
      ...customerAddress,
      region: { region_id: customerAddress.regionId },
    })
  }
}
