import useGetCustomerCartId from '#ioc/services/useGetCustomerCartId'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'

export default <T extends (...args: any[]) => any>(useGetCartId: T) => {
  return (): (() => Promise<any>) => {
    const getCartId = useGetCartId()
    const getCustomerCartId = useGetCustomerCartId()
    const customerStore = useCustomerStore()

    return async () => {
      return await waitForStore(
        customerStore,
        () => customerStore.customer !== undefined,
        async () => {
          if (customerStore.customer) {
            return getCustomerCartId()
          } else {
            return getCartId()
          }
        },
      )
    }
  }
}
