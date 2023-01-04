import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('robots', {
  state: () => ({
    content: '',
  }),
})
