import ToCart from '#ioc/mappers/ToCart'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import useProduct from '#ioc/composables/useProduct'
import useCartItem from '#ioc/composables/useCartItem'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useRemoveFromCartRepository from '#ioc/repositories/useRemoveFromCartRepository'
import { ref } from 'vue'
import useAddToCart from '#ioc/services/useAddToCart'
import useUpdateCartItem from '#ioc/services/useUpdateCartItem'

interface Options {
  quantity?: number
}

export default defineStore('cart', () => {
  const getOrCreateCartId = useGetOrCreateCartId()
  const addToCartService = useAddToCart()
  const updateCartItemService = useUpdateCartItem()
  const removeFromCartRepository = useRemoveFromCartRepository()

  const isMiniCartVisible = ref(false)
  const cart = ref(undefined as ReturnType<typeof ToCart> | undefined | null)

  const $reset = () => {
    cart.value = undefined
  }

  const addToCart = async (product: ReturnType<typeof useProduct>, { quantity = 1 }: Options = {}) => {
    return await addToCartService(product, { quantity })
  }

  const removeFromCart = async (cartItem: ReturnType<typeof useCartItem>) => {
    const { id } = await getOrCreateCartId()

    const { cart: newCart } = await removeFromCartRepository(id, cartItem)

    cart.value = newCart
  }
  const updateCartItem = async (...args: Parameters<typeof updateCartItemService>) => {
    return await updateCartItemService(...args)
  }

  return { isMiniCartVisible, cart, addToCart, removeFromCart, updateCartItem, $reset }
})
