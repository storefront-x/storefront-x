import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'
import useCookies from '#ioc/composables/useCookies'
import COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME'

export default () => {
  const magento = useMagento()
  const cookies = useCookies()

  return async () => {
    try {
      const { data } = await magento.graphql(CreateCompareList())

      cookies.set(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME, data.createCompareList?.uid, { path: '/' })

      return {
        id: data.createCompareList?.uid ?? '',
      }
    } catch (error) {
      console.warn(error)
      return { id: null }
    }
  }
}
