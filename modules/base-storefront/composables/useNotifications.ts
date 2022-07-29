import { computed, reactive } from 'vue'
import useNotificationStore from '#ioc/stores/useNotificationStore'

export default () => {
  const notification = useNotificationStore()

  const notifications = computed(() => notification.notifications)

  return reactive({
    notifications,
  })
}
