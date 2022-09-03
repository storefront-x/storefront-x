import useRouter from '#ioc/composables/useRouter'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import type { RouteLocation, RouteLocationRaw, RouteLocationNamedRaw } from 'vue-router'

export default () => {
  const router = useRouter()
  const currentLocale = useCurrentLocale()

  return (target: RouteLocationRaw, locale: string = currentLocale.value.name): RouteLocation => {
    if (!locale) throw new Error('Undefined locale')

    const currentPrefix = VUE_I18N_LOCALES.find((l) => l.name === locale)?.prefix

    if (typeof target === 'string') {
      if (target.startsWith('/')) {
        if (currentPrefix === '/') {
          return router.resolve(target)
        } else {
          return router.resolve(`${currentPrefix}${target}`)
        }
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
