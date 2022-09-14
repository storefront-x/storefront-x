import useProduct from '#ioc/composables/useProduct'
import useAddToCartRepository from '#ioc/repositories/useAddToCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import useAddBundleProductToCartRepository from '#ioc/repositories/useAddBundleProductToCartRepository'
import useAddConfigurableProductsToCartRepository from '../repositories/useAddConfigurableProductsToCartRepository'

interface Options {
  quantity?: number
  bundle?: object
  variantSku?: string
  options?: string[]
}

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const addToCartRepository = useAddToCartRepository()
  const addBundleProductToCartRepository = useAddBundleProductToCartRepository()
  const addConfigurableProductsToCartRepository = useAddConfigurableProductsToCartRepository()

  return async (
    product: ReturnType<typeof useProduct>,
    { quantity = 1, bundle = {}, variantSku, options }: Options = {},
  ) => {
    const { id } = await getOrCreateCartId()

    let response = null

    if (isNonEmptyObject(bundle)) {
      response = await addBundleProductToCartRepository(id, product, { quantity, bundle })
    } else if (variantSku) {
      response = await addConfigurableProductsToCartRepository(id, product, { quantity, variantSku })
    } else {
      response = await addToCartRepository(id, product, {
        quantity,
        options,
      })
    }

    cartStore.$patch(response)
  }
}
