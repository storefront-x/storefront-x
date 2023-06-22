import useCookies from '#ioc/composables/useCookies'

export default () => {
  const cookies = useCookies()
  const ident = 'flash-messages'
  const clear = () => cookies.remove(ident)

  const get = () => {
    const flashMessages = cookies.get(ident) ? cookies.get(ident) : []
    clear()
    return flashMessages
  }
  return {
    get,
    add: (value: any) => cookies.set(ident, JSON.stringify([...get(), value])),
  }
}
