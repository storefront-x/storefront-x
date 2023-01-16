import getAddToCart from '~/cypress/support/pageObjects/product/getAddToCart'

export default () => getAddToCart().scrollIntoView({ duration: 500 }).should('be.visible').click()
