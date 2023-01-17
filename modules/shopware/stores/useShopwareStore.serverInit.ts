import useCookies from '#ioc/composables/useCookies'
import useGetContextRepository from '#ioc/repositories/useGetContextRepository'
import useStoreStore from '#ioc/stores/useStoreStore'
import useShopwareStore from '#ioc/stores/useShopwareStore'
import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'

export default () => {
  const cookies = useCookies()
  const storeStore = useStoreStore()
  const shopwareStore = useShopwareStore()
  const getContextRepository = useGetContextRepository()

  return async () => {
    const { token, currency } = await getContextRepository()

    shopwareStore.$patch({ token })
    storeStore.$patch({ currency })

    cookies.set(SHOPWARE_TOKEN_COOKIE_NAME, token, { path: '/' })
  }
}
