import useCookies from '#ioc/composables/useCookies'
import useCustomer from '#ioc/composables/useCustomer'
import useGetWishlistRepository from '#ioc/repositories/useGetWishlistRepository'
import WISHLIST_COOKIES_NAME from '#ioc/config/WISHLIST_COOKIES_NAME'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'

export default () => {
  const cookies = useCookies()
  const customer = useCustomer()
  const getWishlistRepository = useGetWishlistRepository()
  const getProductsByIdsRepository = useGetProductsByIdsRepository()
  const toWishlistItem = useToWishlistItem()

  return async (): Promise<{
    items: ReturnType<typeof toWishlistItem>[]
  }> => {
    if (customer.isLoggedIn) {
      const { products } = await getWishlistRepository()

      return {
        items: products.map((element) => ({
          id: element.id,
          product: element,
        })),
      }
    } else {
      const wishlistItems = cookies.get(WISHLIST_COOKIES_NAME) || []

      if (wishlistItems.length > 0) {
        const { products } = await getProductsByIdsRepository(wishlistItems)

        return {
          items: products.map((element) => ({
            id: element.id,
            product: element,
          })),
        }
      }

      return {
        items: [],
      }
    }
  }
}
