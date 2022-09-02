import useRouter from '#ioc/composables/useRouter'
import useCurrentStoreProperties from '#ioc/composables/useCurrentStoreProperties'
import type { RouteLocation, RouteLocationRaw, RouteLocationNamedRaw } from 'vue-router'
import { computed } from 'vue'

export default () => {
  const router = useRouter()
  const currentStoreProperties = useCurrentStoreProperties()

  const currentLocale = computed(() => currentStoreProperties.currentStore?.name)

  return (target: RouteLocationRaw, locale: string | undefined = currentLocale.value): RouteLocation | string => {
    if (!locale) throw new Error('Undefined locale')

    const currentPrefix = computed(() => currentStoreProperties.findStore(locale)?.prefix)

    if (typeof target === 'string') {
      if (target.startsWith('/')) {
        if (currentPrefix.value === '/') return router.resolve({ name: `__${locale}` })

        return `${currentPrefix.value}${target}`
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
