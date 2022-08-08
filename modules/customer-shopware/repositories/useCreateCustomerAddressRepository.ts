import useShopware from '#ioc/composables/useShopware'
import useCustomerStore from '#ioc/stores/useCustomerStore'

export default () => {
  const shopware = useShopware()
  const customerStore = useCustomerStore()

  return async (data: {
    firstName: string
    lastName: string
    countryId: string
    regionId: string
    city: string
    street: string
    zipcode: string
    phoneNumber: string
    salutationId: string
  }): Promise<{
    _success: boolean
  }> => {
    await shopware.post(`/account/address`, {
      customerId: customerStore.customer?.id,
      countryId: data.countryId,
      salutationId: data.salutationId,
      firstName: data.firstName,
      lastName: data.lastName,
      regionId: data.regionId,
      city: data.city,
      street: data.street,
      zipcode: data.zipcode,
      phoneNumber: data.phoneNumber,
    })

    return {
      _success: true,
    }
  }
}
