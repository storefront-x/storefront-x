import useRouter from '#ioc/composables/useRouter'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import type { RouteLocationRaw } from 'vue-router'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'
import isObject from '#ioc/utils/isObject'
import isString from '#ioc/utils/isString'
import Locale from '#ioc/types/vue-i18n/Locale'

export default () => {
  const router = useRouter()
  const currentLocale = useCurrentLocale()

  return (target: RouteLocationRaw, locale: string = currentLocale.value.name): string => {
    if (!locale) throw new Error('Undefined locale')

    const selectedLocale = VUE_I18N_LOCALES.find((l) => l.name === locale)

    if (!selectedLocale) throw new Error('Wrong format of locale')

    const isNewLocaleDomain = selectedLocale.name !== currentLocale.value.name && selectedLocale.domain

    if (isNewLocaleDomain) {
      return '//' + selectedLocale.domain + router.resolve(localizeTarget(target, selectedLocale)).fullPath
    } else {
      return router.resolve(localizeTarget(target, selectedLocale)).fullPath
    }
  }
}

const localizeTarget = (target: string | RouteLocationRaw, selectedLocale: Locale): RouteLocationRaw => {
  const localePrefix = selectedLocale.prefix === '/' ? '' : selectedLocale.prefix

  if (isString(target)) {
    return { path: localePrefix + sanitizeStringTarget(target, selectedLocale.name) }
  } else if (isObject(target) && 'name' in target) {
    const { sanitizedPath, sanitizedTarget } = sanitizeObjectTarget(target, selectedLocale.name)

    return { path: localePrefix + sanitizedPath, ...sanitizedTarget }
  } else {
    throw new Error('Wrong target in localePath')
  }
}
const sanitizeStringTarget = (target: string, localeName: string): string => {
  let sanitizedPath = target.startsWith('/') ? target : `/${target}`

  if (target === 'index') {
    sanitizedPath = '/'
  }
  if (target.startsWith('/')) {
    return sanitizedPath
  } else {
    return sanitizedPathToAliasLocale(sanitizedPath, localeName, null)
  }
}
const sanitizeObjectTarget = (target: any, localeName: string): { sanitizedPath: string; sanitizedTarget: object } => {
  const { name, params, ...sanitizedTarget } = target
  let sanitizedPath = `/${String(name)}`

  if (name === 'index') {
    sanitizedPath = '/'
  }

  sanitizedPath = sanitizedPathToAliasLocale(sanitizedPath, localeName, params)

  return { sanitizedPath, sanitizedTarget }
}
const sanitizedPathToAliasLocale = (sanitizedPath: string, localeName: string, params: any): string => {
  const aliasLocale = (VUE_I18N_ROUTE_PATHS as any)[sanitizedPath]?.[localeName] ?? null

  if (!aliasLocale) {
    return sanitizedPath
  }

  if (params) {
    return aliasLocale.replace(/\[(.+?)\]/g, (_: string, $1: string) => `${params[$1]}`)
  } else {
    return aliasLocale
  }
}
