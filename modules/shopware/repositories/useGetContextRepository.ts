import useShopware from '#ioc/composables/useShopware'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const shopware = useShopware()
  const toCurrency = useToCurrency()

  return async () => {
    const response: any = await shopware.get('/context')

    return {
      token: response.token as string,
      currency: toCurrency(response.currency),
    }
  }
}
