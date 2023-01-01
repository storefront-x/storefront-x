import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'
import useCookies from '#ioc/composables/useCookies'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME from '../config/COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME'

export default () => {
  const magento = useMagento()
  const cookies = useCookies()
  const compareProductsStore = useCompareProductsStore()

  return async () => {
    const id = cookies.get(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME)

    try {
      if (id) return { id }

      {
        const { data } = await magento.graphql(CreateCompareList())

        cookies.set(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME, data.createCompareList?.uid, { path: '/' })

        compareProductsStore.$patch({ compareListId: data.createCompareList?.uid })
        return {
          id: data.createCompareList?.uid ?? 0,
        }
      }
    } catch (error) {
      console.warn(error)
      return { id: null }
    }
  }
}
