import FreeShippingConfig from '#ioc/graphql/queries/FreeShippingConfig'
import useMagento from '#ioc/composables/useMagento'
import ToFreeShippingConfig from '#ioc/mappers/ToFreeShippingConfig'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    freeShippingConfig: ReturnType<typeof ToFreeShippingConfig> | null
  }> => {
    const { data } = await magento.graphql(FreeShippingConfig())

    return {
      freeShippingConfig: ToFreeShippingConfig(data?.storeConfig),
    }
  }
}
