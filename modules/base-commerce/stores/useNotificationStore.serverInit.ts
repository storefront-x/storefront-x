import useContext from '#ioc/composables/useContext'
import useShowNotification from '#ioc/composables/useShowNotification'

export default () => {
  const ctx = useContext()
  const showNotification = useShowNotification()
  return async () => {
    if (ctx.req.query.redirectNotification) {
      showNotification(undefined, decodeURI(String(ctx.req.query.message)), ctx.req.query.level?.toString(), {
        timeout: 0,
      })
    }
  }
}
