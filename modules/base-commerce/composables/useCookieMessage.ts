import useCookies from '#ioc/composables/useCookies'

interface Message {
  type: 'ERROR' | 'SUCCESS'
  title?: string
  message: string
}

export default () => {
  const cookies = useCookies()
  const ident = `cookie-messages`

  return {
    get: () => cookies.get(ident),
    set: (value: Message) => {
      const currentMessages = cookies.get(ident) ? cookies.get(ident) : []
      cookies.set(ident, [...currentMessages, value])
    },
    remove: () => cookies.remove(ident),
  }
}
