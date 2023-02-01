import Extension from '#ioc/types/base/Extension'

interface RedirectUrl {
  redirectUrl: string
}

const ToOrder: Extension<RedirectUrl> = (ToOrder) => (data) => {
  const self = ToOrder(data)

  self.redirectUrl = data.redirect_url as string

  return self
}

export default ToOrder
