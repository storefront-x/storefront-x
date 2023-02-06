import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'

const useGetProductComparison = <T extends () => () => any>(useGetProductComparison: T): T =>
  (() => {
    const getProductComparison = useGetProductComparison()
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
            return getProductComparison()
          }
        },
      )
  }) as any

export default useGetProductComparison
