import useProduct from '#ioc/composables/useProduct'
import useAddToCartRepository from '#ioc/repositories/useAddToCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import useAddBundleProductToCartRepository from '#ioc/repositories/useAddBundleProductToCartRepository'

interface Options {
  quantity?: number
  bundle?: object
}

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const addToCartRepository = useAddToCartRepository()
  const addBundleProductToCartRepository = useAddBundleProductToCartRepository()

  return async (product: ReturnType<typeof useProduct>, { quantity = 1, bundle = {} }: Options = {}) => {
    const { id } = await getOrCreateCartId()

    let response = null

    if (isNonEmptyObject(bundle)) {
      response = await addBundleProductToCartRepository(id, product, { quantity, bundle })
    } else {
      response = await addToCartRepository(id, product, {
        quantity,
      })
    }

    cartStore.$patch(response)
  }
}
