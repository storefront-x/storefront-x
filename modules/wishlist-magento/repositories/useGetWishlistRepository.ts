import useMagento from '#ioc/composables/useMagento'
import Wishlists from '#ioc/graphql/queries/Wishlists'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    id: string
    items: ReturnType<typeof ToWishlistItem>[]
  }> => {
    const { data } = await magento.graphql(Wishlists())

    return {
      id: data.customer?.wishlists[0]?.id ?? 0,
      items: data.customer.wishlists.flatMap((wishlist: any) =>
        wishlist.items.map((wishlistItem: any) => ToWishlistItem(wishlistItem)),
      ),
    }
  }
}
