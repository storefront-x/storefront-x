import useRouter from '#ioc/composables/useRouter'
import useI18n from '#ioc/composables/useI18n'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import type { RouteLocation, RouteLocationRaw, RouteLocationNamedRaw } from 'vue-router'

export default () => {
  const router = useRouter()
  const i18n = useI18n()

  const currentLocale = VUE_I18N_LOCALES.find((locale) => locale.locale === i18n.locale.value)?.name

  return (target: RouteLocationRaw, locale: string | undefined = currentLocale): RouteLocation => {
    if (!locale) throw new Error('Undefined locale')

    if (typeof target === 'string') {
      if (target.startsWith('/')) {
        return router.resolve(target)
      } else {
        return router.resolve({ name: `${target}__${locale}` })
      }
    } else if (isNamed(target)) {
      const [name] = target.name!.toString().split('__')

      return router.resolve({ ...target, name: `${name}__${locale}` })
    } else {
      return router.resolve(target)
    }
  }
}

export const isNamed = (target: RouteLocationRaw): target is RouteLocationNamedRaw => {
  return (target as RouteLocationNamedRaw).name !== undefined
}
