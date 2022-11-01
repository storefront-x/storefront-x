import Notification from '#ioc/types/base-commerce/Notification'

interface ToNotificationData {
  id: string
  title: string
  message: string
  level: string
}

export default (data: ToNotificationData): Notification => ({
  id: data.id,
  title: data.title,
  message: data.message,
  level: data.level,
})
