import type { App } from 'vue'
import * as atatus from 'atatus-spa'
import ATATUS_RUM_API_KEY from '#ioc/config/atatus-client/ATATUS_RUM_API_KEY'

export default async (app: App) => {
  const prevHandler = app.config.errorHandler

  app.config.errorHandler = function VueErrorHandler(error: any, vm, info) {
    atatus.notify(error, {
      info: info,
    })

    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(error)
    }

    if (typeof prevHandler === 'function') {
      prevHandler.call(this, error, vm, info)
    }
  }

  atatus.config(ATATUS_RUM_API_KEY).install()
}
