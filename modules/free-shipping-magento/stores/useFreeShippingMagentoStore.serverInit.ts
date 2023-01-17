import useGetFreeShippingConfig from '#ioc/services/useGetFreeShippingConfig'
import useFreeShippingStore from '#ioc/stores/useFreeShippingStore'

export default () => {
  const freeShippingStore = useFreeShippingStore()

  const getFreeShippingConfig = useGetFreeShippingConfig()

  return async () => {
    const freeShippingConfig = await getFreeShippingConfig()

    freeShippingStore.$patch(freeShippingConfig)
  }
}
