import useCartStore from '#ioc/stores/useCartStore'
import useAddToCartRepository from '#ioc/repositories/useAddToCartRepository'
import useProduct from '@storefront-x/catalog/composables/useProduct'
import useCreateEmptyCartRepository from '../repositories/useCreateEmptyCartRepository'

export default () => {
  const cartStore = useCartStore()
  const addToCartRepository = useAddToCartRepository()
  const createEmptyCartRepository = useCreateEmptyCartRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    let response

    if (cartStore.cart?.id) {
      response = await addToCartRepository(cartStore.cart.id, product)
    } else {
      const { id } = await createEmptyCartRepository()

      response = await addToCartRepository(id, product)
    }

    cartStore.$patch(response)
  }
}
