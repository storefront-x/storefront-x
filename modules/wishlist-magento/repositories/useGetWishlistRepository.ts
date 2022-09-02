import useMagento from '#ioc/composables/useMagento'
import Wishlists from '#ioc/graphql/queries/Wishlists'
import useToWishlistItem from '#ioc/mappers/useToWishlistItem'

export default () => {
  const magento = useMagento()
  const toWishlistItem = useToWishlistItem()

  return async (): Promise<{
    id: string
    items: ReturnType<typeof toWishlistItem>[]
  }> => {
    const { data } = await magento.graphql(Wishlists())

    return {
      id: data.customer?.wishlists[0]?.id ?? 0,
      items: data.customer.wishlists.flatMap((wishlist: any) =>
        wishlist.items.map((wishlistItem: any) => toWishlistItem(wishlistItem)),
      ),
    }
  }
}
