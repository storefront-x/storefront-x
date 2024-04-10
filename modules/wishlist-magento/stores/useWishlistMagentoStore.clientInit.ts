import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'

export default () => {
  const wishlistMagentoStore = useWishlistMagentoStore()
  const customerStore = useCustomerStore()
  const getWishlistRepository = useGetWishlistRepository()

  return async () => {
    if (customerStore.customer === null) {
      return
    }
    await waitForStore(
      customerStore,
      () => customerStore.customer !== undefined,
      async () => {
        if (customerStore.customer) {
          const { id, items } = await getWishlistRepository()
          wishlistMagentoStore.$patch({ wishlistId: id, items })
        }
      },
    )
  }
}
