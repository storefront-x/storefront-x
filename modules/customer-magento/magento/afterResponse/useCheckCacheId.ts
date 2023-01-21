import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

export default () => {
  const customerMagentoStore = useCustomerMagentoStore()

  return async (res: Response) => {
    const resCacheId = res.headers.get('X-Magento-Cache-Id')

    if (resCacheId) {
      const storedCacheId = customerMagentoStore.cacheId

      if (storedCacheId !== resCacheId) {
        customerMagentoStore.cacheId = resCacheId
      }
    }
  }
}
