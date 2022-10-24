import useRouter from '#ioc/composables/useRouter'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import type { RouteLocationRaw, RouteLocationNamedRaw } from 'vue-router'

export default () => {
  const router = useRouter()
  const currentLocale = useCurrentLocale()

  return (target: RouteLocationRaw, locale: string = currentLocale.value.name): string => {
    if (!locale) throw new Error('Undefined locale')

    const fullPath = (): string => {
      const currentPrefix = currentLocale.value.prefix

      if (typeof target === 'string') {
        if (target.startsWith('/')) {
          if (currentPrefix === '/') {
            return router.resolve(target).fullPath
          } else {
            return router.resolve(`${currentPrefix}${target}`).fullPath
          }
        } else {
          return router.resolve({ name: `${target}__${locale}` }).fullPath
        }
      } else if (isNamed(target)) {
        const [name] = target.name!.toString().split('__')

        return router.resolve({ ...target, name: `${name}__${locale}` }).fullPath
      } else {
        return router.resolve(target).fullPath
      }
    }

    const domain = (): string => {
      const currentDomain = currentLocale.value.domain

      if (currentDomain) {
        return '//' + currentDomain
      } else {
        return ''
      }
    }

    return domain() + fullPath()
  }
}

export const isNamed = (target: RouteLocationRaw): target is RouteLocationNamedRaw => {
  return (target as RouteLocationNamedRaw).name !== undefined
}
