import useRoute from '#ioc/composables/useRoute'
import useShowNotification from '#ioc/composables/useShowNotification'

export default () => {
  const route = useRoute()
  const showNotification = useShowNotification()
  return async () => {
    if (route.query.redirectNotification) {
      showNotification(undefined, decodeURI(String(route.query.message)), route.query.level?.toString(), { timeout: 0 })
    }
  }
}
