import useShopware from '#ioc/composables/useShopware'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const shopware = useShopware()
  const toCurrency = useToCurrency()

  return async (): Promise<{
    currencies: ReturnType<typeof toCurrency>[]
  }> => {
    const response: any = await shopware.get('/currency')

    return {
      currencies: response.map(toCurrency),
    }
  }
}
