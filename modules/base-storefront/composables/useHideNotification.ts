import useNotificationStore from '#ioc/stores/useNotificationStore'
import useToNotification from '#ioc/mappers/useToNotification'

export default () => {
  const notificationStore = useNotificationStore()
  const toNotification = useToNotification()

  return (notification: ReturnType<typeof toNotification>) => {
    notificationStore.$patch({
      notifications: notificationStore.notifications.filter((n) => n.id !== notification.id),
    })
  }
}
