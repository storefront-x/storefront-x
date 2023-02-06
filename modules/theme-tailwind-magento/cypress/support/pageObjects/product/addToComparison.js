import getAddToComparison from '~/cypress/support/pageObjects/product/getAddToComparison'

export default () => getAddToComparison().scrollIntoView({ duration: 500 }).should('be.visible').click()
