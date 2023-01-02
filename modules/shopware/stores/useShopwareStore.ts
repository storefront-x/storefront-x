import useCookies from '#ioc/composables/useCookies'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useGetContextRepository from '#ioc/repositories/useGetContextRepository'
import useStoreStore from '#ioc/stores/useStoreStore'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'

export default defineStore('shopware', {
  state: () => {
    const cookies = useCookies()

    return {
      token: cookies.get(SHOPWARE_TOKEN_COOKIE_NAME) as string,
    }
  },

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cookies = useCookies()
      const storeStore = useStoreStore()
      const getContextRepository = useGetContextRepository()

      const { token, currency } = await getContextRepository()

      this.$patch({ token })
      storeStore.$patch({ currency })

      cookies.set(SHOPWARE_TOKEN_COOKIE_NAME, token, { path: '/' })
    },
  },
})
