import useGetFreeShippingConfig from '#ioc/services/useGetFreeShippingConfig'
import useFreeShippingStore from '#ioc/stores/useFreeShippingStore'

export default async () => {
  const freeShippingStore = useFreeShippingStore()

  const getFreeShippingConfig = useGetFreeShippingConfig()

  const freeShippingConfig = await getFreeShippingConfig()

  freeShippingStore.$patch(freeShippingConfig)
}
