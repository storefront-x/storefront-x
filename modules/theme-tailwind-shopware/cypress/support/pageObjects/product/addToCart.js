import getAddToCart from '~/cypress/support/pageObjects/product/getAddToCart'

export default function addToCart() {
  return getAddToCart().click().waitForSfx()
}
