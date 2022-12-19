import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'
import useCookies from '#ioc/composables/useCookies'
import COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME from '../config/COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME'

export default () => {
  const magento = useMagento()
  const cookies = useCookies()

  return async () => {
    const id = cookies.get(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME)
    if (id) return { id }

    {
      const { data } = await magento.graphql(CreateCompareList())
      console.log('createCompareList id', data)
      return {
        id: data.createCompareList?.uid ?? 0,
      }
    }
  }
}
