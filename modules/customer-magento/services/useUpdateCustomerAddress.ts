import useUpdateCustomerAddressRepository from '#ioc/repositories/useUpdateCustomerAddressRepository'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

export default () => {
  const updateCustomerAddressRepository = useUpdateCustomerAddressRepository()

  return async (customerAddress: ReturnType<typeof ToCustomerAddress>) => {
    return await updateCustomerAddressRepository({
      ...customerAddress,
      region: { region_id: customerAddress.regionId },
    })
  }
}
