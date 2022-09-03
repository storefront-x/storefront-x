import useShopware from '#ioc/composables/useShopware'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default () => {
  const shopware = useShopware()

  return async () => {
    const response: any = await shopware.get('/context')

    return {
      token: response.token as string,
      currency: ToCurrency(response.currency),
    }
  }
}
