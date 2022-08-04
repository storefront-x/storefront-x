import useShopware from '#ioc/composables/useShopware'
import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'

export default () => {
  const shopware = useShopware()

  return async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    street: string
    city: string
    zipcode: string
    countryId: string
    salutationId: string
  }): Promise<{
    _success: boolean
  }> => {
    await shopware.post(`/account/register`, {
      salutationId: data.salutationId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      storefrontUrl: SHOPWARE_URL,
      billingAddress: {
        street: data.street,
        zipcode: data.zipcode,
        city: data.city,
        countryId: data.countryId,
      },
    })

    return {
      _success: true,
    }
  }
}
