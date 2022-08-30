import useMagento from '#ioc/composables/useMagento'
import StoreConfig from '#ioc/graphql/queries/StoreConfig'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    currency: ReturnType<ReturnType<typeof useToCurrency>>
  }> => {
    const { data } = await magento.graphql(StoreConfig())

    return {
      currency: { code: data.storeConfig.base_currency_code },
    }
  }
}
