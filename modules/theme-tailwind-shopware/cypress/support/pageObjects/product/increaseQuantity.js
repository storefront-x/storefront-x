import getQuantityIncreaseButton from '~/cypress/support/pageObjects/product/getQuantityIncreaseButton'

export default function increaseQuantity() {
  getQuantityIncreaseButton().click()
}
