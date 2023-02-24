import useNotificationStore from '#ioc/stores/useNotificationStore'
import useHideNotification from '#ioc/composables/useHideNotification'
import SECONDS from '#ioc/utils/date/SECONDS'
import uuid from '#ioc/utils/string/uuid'

export default () => {
  const notificationStore = useNotificationStore()
  const hideNotification = useHideNotification()

  return (title = '', message = '', level = 'INFO', { timeout = 6 * SECONDS } = {}) => {
    const newNotification = {
      id: uuid(),
      title,
      message,
      level,
    }

    notificationStore.$patch({ notifications: [...notificationStore.notifications, newNotification] })

    if (timeout) {
      setTimeout(() => {
        hideNotification(newNotification)
      }, timeout)
    }
  }
}
