import useStoreStore from '#ioc/stores/useStoreStore'
import useGetStoreConfig from '#ioc/services/useGetStoreConfig'

export default () => {
  const storeStore = useStoreStore()
  const getStoreConfig = useGetStoreConfig()

  return async () => {
    if (!storeStore.currency) {
      const { currency } = await getStoreConfig()

      storeStore.$patch({ currency })
    }
  }
}
