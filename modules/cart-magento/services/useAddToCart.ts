import useProduct from '#ioc/composables/useProduct'
import useAddToCartRepository from '#ioc/repositories/useAddToCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import useAddBundleProductToCartRepository from '#ioc/repositories/useAddBundleProductToCartRepository'
import useAddConfigurableProductsToCartRepository from '#ioc/repositories/useAddConfigurableProductsToCartRepository'
import useAddSimpleProductsToCartRepository from '#ioc/repositories/useAddSimpleProductsToCartRepository'

interface Options {
  quantity?: number
  bundle?: object
  variantSku?: string
  options?: object
}

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const addToCartRepository = useAddToCartRepository()
  const addBundleProductToCartRepository = useAddBundleProductToCartRepository()
  const addConfigurableProductsToCartRepository = useAddConfigurableProductsToCartRepository()
  const addSimpleProducsToCartRepository = useAddSimpleProductsToCartRepository()

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
    } else if (isNonEmptyObject(options)) {
      response = await addSimpleProducsToCartRepository(id, product, { quantity, options })
    } else {
      response = await addToCartRepository(id, product, {
        quantity,
      })
    }

    cartStore.$patch(response)
  }
}
