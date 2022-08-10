import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'
import ENABLED_IN_NON_PRODUCTION_ENV from '#ioc/config/ssr-cache/ENABLED_IN_NON_PRODUCTION_ENV'
import consola from 'consola'
import { Request, Response, NextFunction } from 'express'

const logger = consola.withTag('ssr-cache')

const ENABLED = IS_PRODUCTION || ENABLED_IN_NON_PRODUCTION_ENV

if (!ENABLED) {
  logger.info('SSR cache disabled in non-production environments')
} else {
  logger.info('SSR cache enabled')
}

const cache = new Map<string, string>()

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!ENABLED) {
    return next()
  }

  const url = req.url

  if (cache.has(url)) {
    return res.status(200).set({ 'Content-Type': 'text/html' }).send(cache.get(url))
  } else {
    const send = res.send

    res.send = function (body) {
      cache.set(url, body)

      return send.call(this, body)
    }

    return next()
  }
}
