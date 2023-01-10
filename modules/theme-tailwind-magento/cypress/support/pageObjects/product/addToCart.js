import getAddToCart from '~/cypress/support/pageObjects/product/getAddToCart'

export default function addToCart() {
  return getAddToCart().scrollIntoView({ duration: 500 }).should('be.visible').click()
}
