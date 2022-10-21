import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'

export default () => {
  const magento = useMagento()

  return async (products: ReturnType<typeof ToProduct>[], id: any) => {
    const {
      data: { addProductsToWishlist },
    } = await magento.graphql(AddProductsToWishlist().with({ id, items: products }))

    if (!addProductsToWishlist) throw new Error()

    return {
      wishlist: addProductsToWishlist.wishlist,
    }
  }
}
