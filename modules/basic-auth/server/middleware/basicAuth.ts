import consola from 'consola'

import { createCookies } from '@vueuse/integrations/useCookies'

import BASIC_AUTH from '#ioc/config/BASIC_AUTH'
import BASIC_AUTH_IP_WHITELIST from '#ioc/config/BASIC_AUTH_IP_WHITELIST'
import BASIC_AUTH_COOKIE_NAME from '#ioc/config/BASIC_AUTH_COOKIE_NAME'
import BASIC_AUTH_REDIRECT_URL from '#ioc/config/BASIC_AUTH_REDIRECT_URL'
import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'

import once from '#ioc/utils/once'
import queryToObject from '#ioc/utils/url/queryToObject'
import fromBase64 from '#ioc/utils/string/fromBase64'
import toBase64 from '#ioc/utils/string/toBase64'

import type { Request, Response, NextFunction } from 'express'

interface User {
  username: string
  password: string
}

const logger = consola.withTag('basic-auth')

const users: User = BASIC_AUTH.split('|')
  .map((credentials) => credentials.split(':'))
  .reduce((users, [username, password]) => ({ ...users, [username]: password }), {}) as User

const ipWhitelist = new Set(BASIC_AUTH_IP_WHITELIST?.split('|') || '')

const getRemoteIp = (req: Request) => req.headers['x-forwarded-for'] || req.socket.remoteAddress

export default (req: Request, res: Response, next: NextFunction) => {
  const cookies = createCookies(req)()

  if (!IS_PRODUCTION) {
    logger.info('Basic auth disabled in dev mode')
    return (_: any, __: any, next: NextFunction) => next()
  }

  const ip = getRemoteIp(req) as string
  if (ipWhitelist.has(ip)) {
    once(`Basic auth disabled for ${ip} based on whitelist`, logger.log)
    return next()
  }

  const [username, password] = fromBase64(cookies.get(BASIC_AUTH_COOKIE_NAME) || '').split(':') as unknown as keyof User

  if (users[username as keyof User] && users[username as keyof User] === password) return next()

  if (req.method === 'POST') {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      const { username, password } = queryToObject(data)

      if (users[username as keyof User] && users[username as keyof User] === password) {
        res.cookie(BASIC_AUTH_COOKIE_NAME, toBase64(`${username}:${password}`))
        return res.redirect('/')
      } else {
        return res.redirect(BASIC_AUTH_REDIRECT_URL)
      }
    })
  } else {
    if (req.url.includes(BASIC_AUTH_REDIRECT_URL)) return next()

    return res.redirect(BASIC_AUTH_REDIRECT_URL)
  }
}
