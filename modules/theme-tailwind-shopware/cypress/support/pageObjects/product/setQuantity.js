import getQuantityInput from '~/cypress/support/pageObjects/product/getQuantityInput'

export default (quantity) => getQuantityInput().clear().type(quantity).blur()
