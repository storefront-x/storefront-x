import useProduct from '#ioc/composables/useProduct'
import useAddToCartRepository from '#ioc/repositories/useAddToCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

interface Options {
  quantity?: number
}

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const addToCartRepository = useAddToCartRepository()

  return async (product: ReturnType<typeof useProduct>, { quantity = 1 }: Options = {}) => {
    const { id } = await getOrCreateCartId()

    const response = await addToCartRepository(id, {
      sku: product.sku,
      quantity,
    })

    cartStore.$patch(response)
  }
}
