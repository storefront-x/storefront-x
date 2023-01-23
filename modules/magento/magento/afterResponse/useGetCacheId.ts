import useMagentoStore from '#ioc/stores/useMagentoStore'

export default () => {
  const magentoStore = useMagentoStore()

  return async (res: Response) => {
    const resCacheId = res.headers.get('X-Magento-Cache-Id')

    if (resCacheId) {
      if (magentoStore.cacheId !== resCacheId) {
        magentoStore.cacheId = resCacheId
      }
    }
  }
}
