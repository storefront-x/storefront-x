import getProductFromMinicart from '~/cypress/support/pageObjects/minicart/getProductFromMinicart'

export default () => {
  getProductFromMinicart().within(() => {
    cy.get('[data-cy=minicart-item-remove-button]').click()
  })
}
