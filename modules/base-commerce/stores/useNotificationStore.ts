import useToNotification from '#ioc/mappers/useToNotification'
import { defineStore } from 'pinia'

export default defineStore('notification', {
  state: () => ({
    notifications: [] as ReturnType<ReturnType<typeof useToNotification>>[],
  }),
})
