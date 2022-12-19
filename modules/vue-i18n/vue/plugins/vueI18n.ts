import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_LEGACY from '#ioc/config/VUE_I18N_LEGACY'
import VUE_I18N_FALLBACK_FORMAT from '#ioc/config/VUE_I18N_FALLBACK_FORMAT'
import VUE_I18N_MISSING_WARN from '#ioc/config/VUE_I18N_MISSING_WARN'
import VUE_I18N_FALLBACK_WARN from '#ioc/config/VUE_I18N_FALLBACK_WARN'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'
import IS_SERVER from '#ioc/config/IS_SERVER'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import messages from '@intlify/unplugin-vue-i18n/messages'
import i18nNumbers from '~/.sfx/i18n/numbers'
import i18nDatetimes from '~/.sfx/i18n/datetimes'

export default async (app: App, ctx: any) => {
  const locale = getLocale(ctx)

  const i18n = createI18n({
    locale: locale,
    fallbackLocale: VUE_I18N_LOCALES[0].locale,
    messages,
    legacy: VUE_I18N_LEGACY,
    fallbackFormat: VUE_I18N_FALLBACK_FORMAT,
    missingWarn: VUE_I18N_MISSING_WARN,
    fallbackWarn: VUE_I18N_FALLBACK_WARN,
    numberFormats: i18nNumbers,
    datetimeFormats: i18nDatetimes,
  })

  ctx.$i18n = i18n

  app.use(i18n)
}

function getLocale(ctx: any): string {
  let domain = ''

  if (IS_SERVER) {
    domain = ctx.req.get('host')
  } else {
    domain = window.location.host
  }

  for (const locale of VUE_I18N_LOCALES) {
    if (domain === locale.domain) {
      return locale.locale
    }
  }

  let path = ''

  if (IS_SERVER) {
    path = ctx.req.url.split('/').slice(1)[0]
  } else if (IS_CLIENT) {
    path = window.location.pathname.split('/').slice(1)[0]
  }

  const isRouteConfigDefined = Object.keys(VUE_I18N_ROUTE_PATHS).length > 0

  let localeName = ''

  if (isRouteConfigDefined) {
    for (const [, value] of Object.entries(VUE_I18N_ROUTE_PATHS)) {
      for (const [name, localePath] of Object.entries(value as keyof typeof VUE_I18N_ROUTE_PATHS)) {
        if (path === localePath) {
          localeName = name
          break
        }
      }
    }
  }

  for (let i = 0; i < VUE_I18N_LOCALES.length; i++) {
    if (localeName !== '') {
      if (VUE_I18N_LOCALES[i].name === localeName) {
        return VUE_I18N_LOCALES[i].locale
      }
    }
    if (VUE_I18N_LOCALES[i].prefix.endsWith(path)) {
      return VUE_I18N_LOCALES[i].locale
    }
  }

  return VUE_I18N_LOCALES[0].locale
}
