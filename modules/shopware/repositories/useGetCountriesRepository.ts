import useShopware from '#ioc/composables/useShopware'
import ToCountry from '#ioc/mappers/ToCountry'

export default () => {
  const shopware = useShopware()

  return async () => {
    const { elements }: any = await shopware.get('/country')

    return {
      countries: elements.map(ToCountry),
    }
  }
}
