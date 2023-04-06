import { deleteCookie, setCookie } from 'h3'
import { useCookies, createCookies } from '@vueuse/integrations/useCookies'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useContext from '#ioc/composables/useContext'

export default () => {
  if (IS_CLIENT) {
    return useCookies()
  } else {
    const ctx = useContext()
    const cookies = createCookies(ctx.event.node.req)()

    cookies.addChangeListener((change) => {
      if (change.value === undefined) {
        deleteCookie(ctx.event, change.name, change.options)
      } else {
        setCookie(ctx.event, change.name, change.value, change.options)
      }
    })

    return cookies
  }
}
