import {
  eventHandler,
  getRequestURL,
  getRequestHeader,
  parseCookies,
  getMethod,
  sendRedirect,
  readBody,
  setCookie,
} from 'h3'
import consola from 'consola'
import credentials from '#ioc/config/cookieAuth/credentials'
import ipWhitelist from '#ioc/config/cookieAuth/ipWhitelist'
import cookieName from '#ioc/config/cookieAuth/cookieName'
import redirectUrl from '#ioc/config/cookieAuth/redirectUrl'
import IS_PRODUCTION from '#ioc/config/IS_PRODUCTION'
import once from '#ioc/utils/once'
import fromBase64 from '#ioc/utils/string/fromBase64'
import toBase64 from '#ioc/utils/string/toBase64'
import allowInDevelopment from '#ioc/config/cookieAuth/allowInDevelopment'
import fallbackHeaderName from '#ioc/config/cookieAuth/fallbackHeaderName'

interface User {
  username: string
  password: string
}

const logger = consola.withTag('cookie-auth')

const users: User = credentials
  .split('|')
  .map((credentials: string) => credentials.split(':'))
  .reduce((users: string[], [username, password]: [string, string]) => ({ ...users, [username]: password }), {}) as User

const serverMiddleware = eventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress
  if (ipWhitelist.includes(ip)) {
    once(`Cookie auth disabled for ${ip} based on IP whitelist`, logger.log)
    return
  }

  const requestCookies = parseCookies(event)
  const cookie = requestCookies[cookieName]
  const header = getRequestHeader(event, fallbackHeaderName)

  const encoded = cookie || header || ''

  const [_username, _password] = fromBase64(encoded).split(':')

  const username = (_username ?? '').trim()
  const password = (_password ?? '').trim()

  if (users[username as keyof User] && users[username as keyof User] === password) return

  if (getMethod(event) === 'POST') {
    const body = await readBody(event)
    const { username, password } = body

    if (users[username as keyof User] && users[username as keyof User] === password) {
      setCookie(event, cookieName, toBase64(`${username}:${password}`))

      return sendRedirect(event, '/')
    } else {
      return sendRedirect(event, redirectUrl + '?status=bad-credentials', 302)
    }
  } else {
    if (getRequestURL(event).pathname.includes(redirectUrl)) return

    return sendRedirect(event, redirectUrl, 302)
  }
})

const makeServerMiddleware = () => {
  if (IS_PRODUCTION || allowInDevelopment) {
    return serverMiddleware
  } else {
    logger.info('Cookie auth disabled in dev mode')
    return
  }
}

export default makeServerMiddleware()
