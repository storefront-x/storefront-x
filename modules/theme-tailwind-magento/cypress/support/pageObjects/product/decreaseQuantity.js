import getQuantityDecreaseButton from '~/cypress/support/pageObjects/product/getQuantityDecreaseButton'

export default () => getQuantityDecreaseButton().scrollIntoView({ duration: 500 }).should('be.visible').click()
