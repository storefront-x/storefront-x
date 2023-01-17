import useStoreStore from '#ioc/stores/useStoreStore'
import useGetStoreConfig from '#ioc/services/useGetStoreConfig'

export default async () => {
  const storeStore = useStoreStore()
  const getStoreConfig = useGetStoreConfig()

  if (!storeStore.currency) {
    const { currency } = await getStoreConfig()

    storeStore.$patch({ currency })
  }
}
