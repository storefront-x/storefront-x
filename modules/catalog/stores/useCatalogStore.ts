import useToCategory from '#ioc/mappers/useToCategory'
import { defineStore } from 'pinia'

export default defineStore('catalog', {
  state: () => ({
    menu: [] as ReturnType<ReturnType<typeof useToCategory>>[],
  }),
})
