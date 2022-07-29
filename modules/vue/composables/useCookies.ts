import { useCookies, createCookies } from '@vueuse/integrations/useCookies'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useContext from '#ioc/composables/useContext'

export default () => {
  if (IS_CLIENT) {
    return useCookies()
  } else {
    const ctx = useContext()
    const cookies = createCookies(ctx.req)()

    cookies.addChangeListener((change) => {
      if (!ctx.res.cookie || ctx.res.headersSent) {
        return
      }

      if (change.value === undefined) {
        ctx.res.clearCookie(change.name, change.options)
      } else {
        const expressOpt = { ...change.options }
        if (change?.options?.maxAge) {
          // the standard for maxAge is seconds but express uses milliseconds
          expressOpt.maxAge = change.options.maxAge * 1000
        }

        ctx.res.cookie(change.name, change.value, expressOpt)
      }
    })

    return cookies
  }
}
