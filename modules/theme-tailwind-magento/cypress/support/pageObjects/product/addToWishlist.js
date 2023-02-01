import getAddToWishlist from '~/cypress/support/pageObjects/product/getAddToWishlist'

export default () => getAddToWishlist().scrollIntoView({ duration: 500 }).should('be.visible').click()
