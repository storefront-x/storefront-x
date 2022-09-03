import ToCategory from '#ioc/mappers/ToCategory'
import { defineStore } from 'pinia'

export default defineStore('catalog', {
  state: () => ({
    menu: [] as ReturnType<typeof ToCategory>[],
  }),
})
