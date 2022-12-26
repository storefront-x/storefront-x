import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'
import useCookies from '#ioc/composables/useCookies'
import COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME from '../config/COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME'

export default () => {
  const magento = useMagento()
  const cookies = useCookies()

  return async () => {
    const id = cookies.get(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME)
    console.log('service COOKIE id', id)
    try {
      if (id) return { id }

      {
        const { data } = await magento.graphql(CreateCompareList())
        console.log('service API createCompareList id', data)
        cookies.set(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME, data.createCompareList?.uid, { path: '/' })
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
