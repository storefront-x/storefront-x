import useMergeWishlistRepository from '#ioc/repositories/useMergeWishlistRepository'
import useWishlistStore from '#ioc/stores/useWishlistStore'

export default () => {
  const mergeWishlistRepository = useMergeWishlistRepository()
  const wishlistStore = useWishlistStore()

  return async () => {
    const ids = wishlistStore.anonymousWishlist
    await mergeWishlistRepository(ids)
  }
}
