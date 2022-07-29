import useCartStore from '#ioc/stores/useCartStore'
import useAddToCartRepository from '#ioc/repositories/useAddToCartRepository'

export default () => {
  const cartStore = useCartStore()
  const addToCartRepository = useAddToCartRepository()

  return async (...args: Parameters<typeof addToCartRepository>) => {
    const response = await addToCartRepository(...args)

    cartStore.$patch(response)
  }
}
