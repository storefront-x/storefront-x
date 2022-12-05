import Redirect from '#ioc/errors/Redirect'

export default (url: string, status: number) => {
  throw new Redirect({ url, status })
}
