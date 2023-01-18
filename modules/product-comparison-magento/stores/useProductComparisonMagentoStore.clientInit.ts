import useGetCompareListById from '#ioc/services/useGetCompareListById'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useAssignCompareListToCustomer from '#ioc/services/useAssignCompareListToCustomer'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useComparisonListLocaleId from '#ioc/composables/useComparisonListLocaleId'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const comparisonListLocaleId = useComparisonListLocaleId()
  const getCompareListById = useGetCompareListById()
  const customerStore = useCustomerStore()
  const assignCompareListToCustomer = useAssignCompareListToCustomer()

  return async () => {
    await waitForStore(
      customerStore,
      () => customerStore.customer !== undefined,
      async () => {
        if (customerStore.customer) {
          productComparisonMagentoStore.$patch(customerStore.customer.compareList)
          return
        }
        const localeStorageId = comparisonListLocaleId.get()
        if (localeStorageId) {
          const { compareList } = await getCompareListById(localeStorageId)
          productComparisonMagentoStore.$patch(compareList)
          return
        }
      },
    )
  }
}
