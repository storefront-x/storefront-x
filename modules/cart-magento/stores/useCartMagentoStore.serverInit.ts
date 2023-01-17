import useCartStore from '#ioc/stores/useCartStore'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import useGetCart from '#ioc/services/useGetCart'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'

export default async () => {
  const cookies = useCookies()
  const cartStore = useCartStore()
  const cartMagentoStore = useCartMagentoStore()

  const id = cookies.get(MAGENTO_CART_COOKIE_NAME)

  cartMagentoStore.$patch({ cartId: id })

  const getCart = useGetCart()

  const cart = await getCart()

  cartStore.$patch(cart)
}
