import useShowNotification from '#ioc/composables/useShowNotification'
import isString from '#ioc/utils/isString'

export default () => {
  const showNotification = useShowNotification()

  return async (err: any) => {
    if (isString(err)) {
      showNotification(undefined, err, 'ERROR', { timeout: 0 })
    } else {
      showNotification(err.name, err.message, 'ERROR', { timeout: 0 })
    }
  }
}
