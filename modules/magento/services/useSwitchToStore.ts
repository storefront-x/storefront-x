import useLocalePath from '#ioc/composables/useLocalePath'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

export default () => {
  const localePath = useLocalePath()

  return async (store: typeof VUE_I18N_LOCALES[0]) => {
    if (store.domain) {
      window.location.href = '//' + store.domain + localePath('/', store.name).fullPath
    } else {
      window.location.href = localePath('/', store.name).fullPath
    }
  }
}
