import useRouter from '#ioc/composables/useRouter'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import type { RouteLocationRaw } from 'vue-router'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'

export default () => {
  const router = useRouter()
  const currentLocale = useCurrentLocale()

  return (target: RouteLocationRaw, locale: string = currentLocale.value.name): string => {
    if (!locale) throw new Error('Undefined locale')

    const selectedLocale = VUE_I18N_LOCALES.find((l) => l.name === locale)!

    const fullPath = (): string => {
      const currentLocalePrefix = selectedLocale.prefix === '/' ? '' : selectedLocale.prefix

      if (typeof target === 'string') {
        const sanitizedTarget = target.startsWith('/') ? target : `/${target}`
        const aliasLocale = (VUE_I18N_ROUTE_PATHS as any)[sanitizedTarget]?.[locale] ?? null

        return router.resolve({ path: `${currentLocalePrefix}${aliasLocale || sanitizedTarget}` }).fullPath
      } else {
        return router.resolve(target).fullPath
      }
    }

    const domain = (): string => {
      const currentDomain = selectedLocale.domain

      if (currentDomain) {
        if (selectedLocale.name === currentLocale.value.name) {
          return ''
        } else {
          return '//' + currentDomain
        }
      } else {
        return ''
      }
    }

    return domain() + fullPath()
  }
}
