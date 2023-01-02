import getQuantityDecreaseButton from '~/cypress/support/pageObjects/product/getQuantityDecreaseButton'

export default function decreaseQuantity() {
  getQuantityDecreaseButton().click()
}
