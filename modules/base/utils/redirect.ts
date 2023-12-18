import Redirect from '#ioc/errors/Redirect'

export default (url: string, status = 302) => {
  throw new Redirect({ url, status })
}
