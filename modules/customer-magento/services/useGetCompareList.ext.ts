import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'

const useGetCompareList = <T extends () => () => any>(useGetCompareList: T): T =>
  (() => {
    const getCompareList = useGetCompareList()
    const customerStore = useCustomerStore()

    return () =>
      waitForStore(
        customerStore,
        () => customerStore.customer !== undefined,
        () => {
          if (customerStore.customer) {
            return {
              compareList: customerStore.customer.compareList,
            }
          } else {
            return getCompareList()
          }
        },
      )
  }) as any

export default useGetCompareList
