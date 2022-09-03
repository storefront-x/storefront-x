import useMagento from '#ioc/composables/useMagento'
import GetAvailableCurrencies from '#ioc/graphql/queries/GetAvailableCurrencies'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    currencies: ReturnType<typeof ToCurrency>[]
  }> => {
    const { data } = await magento.graphql(GetAvailableCurrencies())

    return {
      currencies: data.availableCurrencies.available_currency_codes.map((code: any) => ({ code })),
    }
  }
}
