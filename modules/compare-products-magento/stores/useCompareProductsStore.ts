import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCreateCompareListId from '#ioc/services/useCreateCompareListId'
import useGetCompareListById from '#ioc/services/useGetCompareListById'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import waitForStore from '#ioc/utils/vuePinia/waitForStore'
import useAssignCompareListToCustomer from '#ioc/services/useAssignCompareListToCustomer'
import useCookies from '#ioc/composables/useCookies'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME'

export default defineStore('compareProducts', {
  state: () => ({
    items: [] as ReturnType<typeof ToCompareItem>[],
    attributes: [] as ReturnType<typeof ToCompareAttribute>[],
    compareListId: '',
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const createCompareListId = useCreateCompareListId()
      const getCompareListById = useGetCompareListById()
      const customerStore = useCustomerStore()
      const assignCompareListToCustomer = useAssignCompareListToCustomer()
      const cookies = useCookies()

      await waitForStore(
        customerStore,
        () => customerStore.customer !== undefined,
        async () => {
          if (customerStore.customer) {
            const itemsCompared = cookies.get(COMPARE_PRODUCTS_COOKIE_NAME) || []
            cookies.remove(COMPARE_PRODUCTS_COOKIE_NAME)
            if (itemsCompared.length) {
              const id = cookies.get(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME)

              const { uid, items, attributes } = await assignCompareListToCustomer(id)
              this.$patch({ items: items, attributes: attributes, compareListId: uid })
            }
            cookies.remove(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME)
          }
          const { id } = await createCompareListId()

          const { items, attributes } = await getCompareListById(id)

          this.$patch({ items: items, attributes: attributes, compareListId: id })
        },
      )
    },
  },
})
