import CartResetted from '#ioc/errors/CartResetted'
import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useCartToken from '#ioc/composables/useCartToken'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const cartToken = useCartToken()

  const errorMessages = ['Could not find a cart with ID', `The cart isn't active`]

  return async (error: any) => {
    for (const message of errorMessages) {
      if (error.message?.includes(message)) {
        cartToken.remove()

        cartMagentoStore.$patch({ cartId: null })

        cartStore.$reset()

        throw new CartResetted()
      }
    }
  }
}
