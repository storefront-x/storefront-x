import useShopware from '#ioc/composables/useShopware'
import useToCountries from '#ioc/mappers/useToCountries'

export default () => {
  const shopware = useShopware()
  const toCountries = useToCountries()

  return async () => {
    const { elements }: any = await shopware.get('/country')

    return {
      countries: elements.map(toCountries),
    }
  }
}
