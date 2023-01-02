import defineStore from '#ioc/utils/vuePinia/defineStore'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'

export default defineStore('wishlistMagento', {
  state: () => ({
    wishlistId: '',
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const customerStore = useCustomerStore()
      const getWishlistRepository = useGetWishlistRepository()

      return await waitForStore(
        customerStore,
        () => customerStore.customer !== undefined,
        async () => {
          if (customerStore.customer) {
            const { id } = await getWishlistRepository()
            this.$patch({ wishlistId: id })
          }
        },
      )
    },
  },
})
