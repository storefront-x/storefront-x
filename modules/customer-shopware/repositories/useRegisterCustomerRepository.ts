import useShopware from '#ioc/composables/useShopware'
import useGetSalutations from '#ioc/services/useGetSalutations'
import useGetCountries from '#ioc/services/useGetCountries'
import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'

export default () => {
  const shopware = useShopware()

  const getSalutations = useGetSalutations()
  const getCountries = useGetCountries()

  return async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{
    _success: boolean
  }> => {
    const { salutationId } = await getSalutations()
    const { countryId } = await getCountries()

    await shopware.post(`/account/register`, {
      salutationId: salutationId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      storefrontUrl: SHOPWARE_URL,
      billingAddress: {
        street: 'Apple Alley 42',
        zipcode: '1234-5',
        city: 'Appleton',
        countryId: countryId,
      },
    })

    return {
      _success: true,
    }
  }
}
