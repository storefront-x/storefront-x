import getQuantityInput from '~/cypress/support/pageObjects/product/getQuantityInput'

export default function setQuantity(quantity) {
  getQuantityInput().clear().type(quantity).blur()
}
