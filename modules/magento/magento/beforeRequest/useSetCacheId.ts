import useMagentoStore from '#ioc/stores/useMagentoStore'

export default () => {
  const magentoStore = useMagentoStore()

  return async (req: Request) => {
    if (magentoStore.cacheId) {
      req.headers.set('X-Magento-Cache-Id', magentoStore.cacheId)
    }
  }
}
