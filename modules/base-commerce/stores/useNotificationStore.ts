import ToNotification from '#ioc/mappers/ToNotification'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('notification', {
  state: () => ({
    notifications: [] as ReturnType<typeof ToNotification>[],
  }),
})
