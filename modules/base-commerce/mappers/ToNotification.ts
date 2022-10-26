import ToNotificationData from '#ioc/types/base-commerce/ToNotificationData'

export default (data: ToNotificationData) => ({
  id: data.id,
  title: data.title,
  message: data.message,
  level: data.level,
})
