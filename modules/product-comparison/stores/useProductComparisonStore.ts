import ToCompareList from '#ioc/mappers/ToCompareList'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('productComparsion', {
  state: () => ({
    compareList: undefined as ReturnType<typeof ToCompareList> | undefined | null,
  }),
})
