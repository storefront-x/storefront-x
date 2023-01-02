import getAddToWishlist from '~/cypress/support/pageObjects/product/getAddToWishlist'

export default function addToWishlist() {
  return getAddToWishlist().scrollIntoView({ duration: 500 }).should('be.visible').click()
}
