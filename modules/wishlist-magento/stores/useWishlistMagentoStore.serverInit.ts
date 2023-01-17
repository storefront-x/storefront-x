import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'
import useWishlistMagentoStore from '#ioc/stores/useWishlistMagentoStore'

export default async () => {
  const wishlistMagentoStore = useWishlistMagentoStore()
  const customerStore = useCustomerStore()
  const getWishlistRepository = useGetWishlistRepository()

  return await waitForStore(
    customerStore,
    () => customerStore.customer !== undefined,
    async () => {
      if (customerStore.customer) {
        const { id } = await getWishlistRepository()
        wishlistMagentoStore.$patch({ wishlistId: id })
      }
    },
  )
}
