import { defineStore } from 'pinia'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useGetCompareListByIdRepository from '#ioc/repositories/useCreateCompareListRepository'
import useCustomerStore from '#ioc/stores/useCustomerStore'
export default defineStore('compareProducts', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
    compareListId: '',
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return
      const customerStore = useCustomerStore()
      const getCompareListByIdRepository = useGetCompareListByIdRepository()
      // const { id } = await getCompareListByIdRepository()
      // console.log('testing compare store', id)
      // const cookies = useCookies()
      // const itemsCompared = cookies.get(COMPARE_PRODUCTS_COOKIE_NAME) || []
      // this.$patch({ items: itemsCompared })
      return await waitForStore(
        customerStore,
        () => customerStore !== undefined, // just check the store
        async () => {
          if (customerStore.customer) {
            const { id } = await getCompareListByIdRepository()
            this.$patch({ compareListId: id })
            //find and patch items, add to a cookie
          }
        },
      )
    },
  },
})
