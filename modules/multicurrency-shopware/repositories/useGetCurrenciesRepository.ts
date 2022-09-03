import useShopware from '#ioc/composables/useShopware'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    currencies: ReturnType<typeof ToCurrency>[]
  }> => {
    const response: any = await shopware.get('/currency')

    return {
      currencies: response.map(ToCurrency),
    }
  }
}
