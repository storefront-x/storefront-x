import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('catalogMagento', {
  state: () => ({
    productUrlSuffix: '',
    categoryUrlSuffix: '',
  }),
})
