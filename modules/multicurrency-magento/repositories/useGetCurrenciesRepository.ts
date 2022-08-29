import useMagento from '#ioc/composables/useMagento'
import CurrencyConfig from '#ioc/graphql/queries/CurrencyConfig'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const magento = useMagento()
  const toCurrency = useToCurrency()

  return async (): Promise<{
    currencies: ReturnType<typeof toCurrency>
  }> => {
    const {
      data: { currencyConfig },
    } = await magento.graphql(CurrencyConfig())

    return {
      currencies: toCurrency(currencyConfig),
    }
  }
}
