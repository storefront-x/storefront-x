import ToNotification from '#ioc/mappers/ToNotification'
import { defineStore } from 'pinia'

export default defineStore('notification', {
  state: () => ({
    notifications: [] as ReturnType<typeof ToNotification>[],
  }),
})
