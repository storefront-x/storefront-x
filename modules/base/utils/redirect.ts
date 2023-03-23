import Redirect from '#ioc/errors/Redirect'

export default (url: string, status = 301, redirectNotification: { level: string; message: string } | null) => {
  throw new Redirect({ url, status, redirectNotification })
}
