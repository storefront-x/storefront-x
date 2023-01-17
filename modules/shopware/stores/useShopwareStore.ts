import useCookies from '#ioc/composables/useCookies'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'

export default defineStore('shopware', {
  state: () => {
    const cookies = useCookies()

    return {
      token: cookies.get(SHOPWARE_TOKEN_COOKIE_NAME) as string,
    }
  },
})
