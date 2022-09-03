import useCreateCustomerAddressRepository from '#ioc/repositories/useCreateCustomerAddressRepository'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

export default () => {
  const createCustomerAddressRepository = useCreateCustomerAddressRepository()

  return async (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
    return await createCustomerAddressRepository({
      ...customerAddress,
      region: { region_id: customerAddress.regionId },
    })
  }
}
