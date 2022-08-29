import useMagento from '#ioc/composables/useMagento'
import StoreConfig from '#ioc/graphql/queries/StoreConfig'
import useToStoreConfig from '#ioc/mappers/useToStoreConfig'

export default () => {
  const magento = useMagento()
  const toStoreConfig = useToStoreConfig()

  return async (): Promise<{
    storeConfig: ReturnType<typeof toStoreConfig>
  }> => {
    const {
      data: { storeConfig },
    } = await magento.graphql(StoreConfig())

    return {
      storeConfig: toStoreConfig(storeConfig),
    }
  }
}
