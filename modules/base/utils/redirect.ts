import Redirect from '#ioc/errors/Redirect'

export default (url: string, status = 301) => {
  throw new Redirect({ url, status })
}
