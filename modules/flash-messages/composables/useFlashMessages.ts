import useCookies from '#ioc/composables/useCookies'

interface Message {
  type: 'ERROR' | 'SUCCESS'
  title?: string
  message: string
}

export default () => {
  const cookies = useCookies()

  const get = (ident: string) => (cookies.get(ident) ? cookies.get(ident) : [])
  return {
    get,
    add: (ident: string, value: Message) => cookies.set(ident, JSON.stringify([...get(ident), value])),
    remove: (ident: string) => cookies.remove(ident),
  }
}
