import { defineStore } from 'pinia'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useGetCompareListByIdRepository from '#ioc/repositories/useCreateCompareListRepository'

export default defineStore('compareProducts', {
  state: () => ({
    items: [] as ReturnType<typeof ToWishlistItem>[],
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return
      const getCompareListByIdRepository = useGetCompareListByIdRepository()
      const nothing = await getCompareListByIdRepository()
      console.log('testing compare store', nothing)
      const cookies = useCookies()
      const itemsCompared = cookies.get(COMPARE_PRODUCTS_COOKIE_NAME) || []
      this.$patch({ items: itemsCompared })
    },
  },
})
