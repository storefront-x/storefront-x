import useLocalePath from '#ioc/composables/useLocalePath'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

export default () => {
  const localePath = useLocalePath()

  return async (store: (typeof VUE_I18N_LOCALES)[0]) => {
    window.location.href = localePath('/', store.name)
  }
}
