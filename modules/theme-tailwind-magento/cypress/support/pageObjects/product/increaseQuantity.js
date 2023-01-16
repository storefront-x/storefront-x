import getQuantityIncreaseButton from '~/cypress/support/pageObjects/product/getQuantityIncreaseButton'

export default () => getQuantityIncreaseButton().scrollIntoView({ duration: 500 }).should('be.visible').click()
