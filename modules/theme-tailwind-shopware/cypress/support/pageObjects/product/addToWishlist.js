import getAddToWishlist from '~/cypress/support/pageObjects/product/getAddToWishlist'

export default function addToWishlist() {
  return getAddToWishlist().click()
}
