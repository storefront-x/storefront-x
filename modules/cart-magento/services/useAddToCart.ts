import useProduct from '#ioc/composables/useProduct'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import useAddBundleProductToCartRepository from '#ioc/repositories/useAddBundleProductToCartRepository'
import useAddConfigurableProductToCartRepository from '#ioc/repositories/useAddConfigurableProductToCartRepository'
import useAddSimpleProductToCartRepository from '#ioc/repositories/useAddSimpleProductToCartRepository'

interface Options {
  quantity?: number
  bundle?: object
  variantSku?: string
  options?: object
}

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const addBundleProductToCartRepository = useAddBundleProductToCartRepository()
  const addConfigurableProductToCartRepository = useAddConfigurableProductToCartRepository()
  const addSimpleProductToCartRepository = useAddSimpleProductToCartRepository()

  return async (
    product: ReturnType<typeof useProduct>,
    { quantity = 1, bundle = {}, variantSku, options }: Options = {},
  ) => {
    const { id } = await getOrCreateCartId()

    let response = null

    if (isNonEmptyObject(bundle)) {
      response = await addBundleProductToCartRepository(id, product, { quantity, bundle })
    } else if (variantSku) {
      response = await addConfigurableProductToCartRepository(id, product, { quantity, variantSku })
    } else {
      response = await addSimpleProductToCartRepository(id, product, { quantity, options })
    }

    cartStore.$patch(response)
  }
}
