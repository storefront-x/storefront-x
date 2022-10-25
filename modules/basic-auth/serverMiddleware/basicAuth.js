import consola from 'consola'
import { once } from '@sfx/utils/CoreUtils'
import { queryToObject } from '@sfx/utils/UrlUtils'
import { getCookie } from '@sfx/core/Cookies'
import { fromBase64, toBase64 } from '@sfx/utils/StringUtils'
import { BASIC_AUTH, BASIC_AUTH_IP_WHITELIST, BASIC_AUTH_COOKIE_NAME, BASIC_AUTH_REDIRECT_URL } from '@ioc/config'

const logger = consola.withTag('basic-auth')

const users = BASIC_AUTH.split('|')
  .map((credentials) => credentials.split(':'))
  .reduce((users, [username, password]) => ({ ...users, [username]: password }), {})

const ipWhitelist = new Set(BASIC_AUTH_IP_WHITELIST.split('|'))

const getRemoteIp = (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress

const makeBasicAuthMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Basic auth disabled in dev mode')
    return (_, __, next) => next()
  }

  return (req, res, next) => {
    const ip = getRemoteIp(req)
    if (ipWhitelist.has(ip)) {
      once(`Basic auth disabled for ${ip} based on whitelist`, logger.log)
      return next()
    }

    const [username, password] = fromBase64(getCookie({ req })(BASIC_AUTH_COOKIE_NAME)).split(':')

    if (users[username] && users[username] === password) return next()

    if (req.method === 'POST') {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk
      })
      req.on('end', () => {
        const { username, password } = queryToObject(data)

        if (users[username] && users[username] === password) {
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
}

export default makeBasicAuthMiddleware()
