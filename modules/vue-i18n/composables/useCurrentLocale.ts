import useI18n from '#ioc/composables/useI18n'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import { computed } from 'vue'

export default () => {
  const { locale } = useI18n()

  return computed(() => VUE_I18N_LOCALES.find((item) => item.locale === locale.value)!)
}
