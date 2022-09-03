import useMagento from '#ioc/composables/useMagento'
import StoreConfig from '#ioc/graphql/queries/StoreConfig'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    currency: ReturnType<typeof ToCurrency>
  }> => {
    const { data } = await magento.graphql(StoreConfig())

    return {
      currency: {
        id: data.storeConfig.base_currency_code,
        code: data.storeConfig.base_currency_code,
      },
    }
  }
}
