import type { Request, Response, NextFunction } from 'express'
import consola from 'consola'
import credentials from '#ioc/config/cookieAuth/credentials'
import ipWhitelist from '#ioc/config/cookieAuth/ipWhitelist'
import cookieName from '#ioc/config/cookieAuth/cookieName'
import redirectUrl from '#ioc/config/cookieAuth/redirectUrl'
import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'
import once from '#ioc/utils/once'
import queryToObject from '#ioc/utils/url/queryToObject'
import fromBase64 from '#ioc/utils/string/fromBase64'
import toBase64 from '#ioc/utils/string/toBase64'
import allowInDevelopment from '#ioc/config/cookieAuth/allowInDevelopment'

interface User {
  username: string
  password: string
}

const logger = consola.withTag('cookie-auth')

const users: User = credentials
  .split('|')
  .map((credentials) => credentials.split(':'))
  .reduce((users, [username, password]) => ({ ...users, [username]: password }), {}) as User

const getRemoteIp = (req: Request) => req.headers['x-forwarded-for'] || req.socket.remoteAddress

const serverMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookies = getCookies(req)

  const ip = getRemoteIp(req) as string
  if (ipWhitelist.includes(ip)) {
    once(`Cookie auth disabled for ${ip} based on IP whitelist`, logger.log)
    return next()
  }

  const [_username, _password] = fromBase64(cookies.get(cookieName) || '').split(':')

  const username = (_username ?? '').trim()
  const password = (_password ?? '').trim()

  if (users[username as keyof User] && users[username as keyof User] === password) return next()

  if (req.method === 'POST') {
    let data = ''

    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      const { username, password } = queryToObject(data)

      if (users[username as keyof User] && users[username as keyof User] === password) {
        res.cookie(cookieName, toBase64(`${username}:${password}`))
        return res.redirect('/')
      } else {
        return res.redirect(302, redirectUrl)
      }
    })
  } else {
    if (req.url.includes(redirectUrl)) return next()

    return res.redirect(302, redirectUrl)
  }
}

const makeServerMiddleware = () => {
  if (IS_PRODUCTION || allowInDevelopment) {
    return serverMiddleware
  } else {
    logger.info('Cookie auth disabled in dev mode')
    return (_: any, __: any, next: NextFunction) => next()
  }
}

const getCookies = (req: Request) => {
  const cookies = new Map<string, string>()

  const parts = (req.headers.cookie ?? '')
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part !== '')

  for (const part of parts) {
    const [name, value] = part.split('=')

    cookies.set(name, value.replace(/%3D%3D$/, ''))
  }

  return cookies
}

export default makeServerMiddleware()
