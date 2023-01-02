import ToCategory from '#ioc/mappers/ToCategory'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('catalog', {
  state: () => ({
    menu: [] as ReturnType<typeof ToCategory>[],
  }),
})
