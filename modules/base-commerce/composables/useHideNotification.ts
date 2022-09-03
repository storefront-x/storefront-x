import useNotificationStore from '#ioc/stores/useNotificationStore'
import ToNotification from '#ioc/mappers/ToNotification'

export default () => {
  const notificationStore = useNotificationStore()

  return (notification: ReturnType<typeof ToNotification>) => {
    notificationStore.$patch({
      notifications: notificationStore.notifications.filter((n) => n.id !== notification.id),
    })
  }
}
