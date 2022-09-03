import useSetLanguageRepository from '#ioc/repositories/useSetLanguageRepository'
import useCookies from '#ioc/composables/useCookies'
import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'
import useLocalePath from '#ioc/composables/useLocalePath'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

export default () => {
  const setLanguageRepository = useSetLanguageRepository()
  const localePath = useLocalePath()
  const cookies = useCookies()

  return async (store: typeof VUE_I18N_LOCALES[0]) => {
    const { token } = await setLanguageRepository(store.languageId)

    cookies.set(SHOPWARE_TOKEN_COOKIE_NAME, token, { path: '/' })

    window.location.href = localePath('/', store.name).fullPath
  }
}
