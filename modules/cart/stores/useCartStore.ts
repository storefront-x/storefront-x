import ToCart from '#ioc/mappers/ToCart'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('cart', {
  state: () => ({
    cart: undefined as ReturnType<typeof ToCart> | undefined | null,
  }),
})
