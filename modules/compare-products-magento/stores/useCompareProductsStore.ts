import { defineStore } from 'pinia'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useCreateCompareListIdRepository from '#ioc/repositories/useCreateCompareListIdRepository'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCompareListById from '#ioc/services/useGetCompareListById'

export default defineStore('compareProducts', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
    compareListId: '',
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return
      const customerStore = useCustomerStore()
      const createCompareListIdRepository = useCreateCompareListIdRepository()
      const getCompareListById = useGetCompareListById()
      const cookies = useCookies()

      const { id } = await createCompareListIdRepository()
      this.$patch({ compareListId: id })
      const itemsCompared = cookies.get(COMPARE_PRODUCTS_COOKIE_NAME) || []
      this.$patch({ items: itemsCompared })

      return await waitForStore(
        customerStore,
        () => customerStore !== undefined,
        async () => {
          if (customerStore.customer) {
            const { id } = await createCompareListIdRepository()
            const { items } = await getCompareListById(id)
            this.$patch({ items: items })
            cookies.set(COMPARE_PRODUCTS_COOKIE_NAME, items, { path: '/' })
          }
        },
      )
    },
  },
})
