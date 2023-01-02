import getQuantityDecreaseButton from '~/cypress/support/pageObjects/product/getQuantityDecreaseButton'

export default function decreaseQuantity() {
  getQuantityDecreaseButton().scrollIntoView({ duration: 500 }).should('be.visible').click()
}
