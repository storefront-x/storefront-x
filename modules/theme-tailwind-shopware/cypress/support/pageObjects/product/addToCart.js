import getAddToCart from '~/cypress/support/pageObjects/product/getAddToCart'

export default () => getAddToCart().click().waitForSfx()
