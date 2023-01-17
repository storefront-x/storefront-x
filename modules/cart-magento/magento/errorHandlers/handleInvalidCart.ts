import CartResetted from '#ioc/errors/CartResetted'
import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'

export default () => {
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()
  const cartTokenIdent = useCartTokenIdent()

  const errorMessages = ['Could not find a cart with ID', `The cart isn't active`]

  return async (error: any) => {
    for (const message of errorMessages) {
      if (error.message?.includes(message)) {
        localStorage.removeItem(cartTokenIdent)

        cartMagentoStore.$patch({ cartId: null })

        cartStore.$reset()

        throw new CartResetted()
      }
    }
  }
}
