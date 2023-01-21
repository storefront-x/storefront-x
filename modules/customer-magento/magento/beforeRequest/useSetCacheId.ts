import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

export default () => {
  const customerMagentoStore = useCustomerMagentoStore()

  return async (req: Request) => {
    if (customerMagentoStore.customerId && customerMagentoStore.cacheId) {
      req.headers.set('X-Magento-Cache-Id', customerMagentoStore.cacheId)
    }
  }
}
