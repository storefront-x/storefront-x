import useShopware from '#ioc/composables/useShopware'
import useToCountry from '#ioc/mappers/useToCountry'

export default () => {
  const shopware = useShopware()
  const toCountry = useToCountry()

  return async () => {
    const { elements }: any = await shopware.get('/country')

    return {
      countries: elements.map(toCountry),
    }
  }
}
