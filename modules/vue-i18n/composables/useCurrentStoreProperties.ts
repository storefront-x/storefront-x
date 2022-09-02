import useI18n from '#ioc/composables/useI18n'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import { computed, reactive } from 'vue'

export default () => {
  const { locale } = useI18n()

  const currentStore = computed(() => VUE_I18N_LOCALES.find((item) => item.locale === locale.value))

  const findStore = (locale: string) => {
    return VUE_I18N_LOCALES.find((item) => item.name === locale)
  }

  const stores = VUE_I18N_LOCALES

  return reactive({
    currentStore,
    stores,
    findStore,
  })
}
