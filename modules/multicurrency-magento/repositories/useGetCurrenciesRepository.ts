import useMagento from '#ioc/composables/useMagento'
import GetAvailableCurrencies from '#ioc/graphql/queries/GetAvailableCurrencies'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    currencies: ReturnType<ReturnType<typeof useToCurrency>>[]
  }> => {
    const { data } = await magento.graphql(GetAvailableCurrencies())

    return {
      currencies: data.availableCurrencies.available_currency_codes.map((code: any) => ({ code })),
    }
  }
}
