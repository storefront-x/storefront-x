import FreeShippingConfig from '#ioc/graphql/queries/FreeShippingConfig'
import useMagento from '#ioc/composables/useMagento'
import useToFreeShippingConfig from '#ioc/mappers/useToFreeShippingConfig'

export default () => {
  const magento = useMagento()
  const toFreeShippingConfig = useToFreeShippingConfig()

  return async (): Promise<{
    freeShippingConfig: ReturnType<typeof toFreeShippingConfig> | null
  }> => {
    const { data } = await magento.graphql(FreeShippingConfig())

    return {
      freeShippingConfig: toFreeShippingConfig(data?.storeConfig),
    }
  }
}
