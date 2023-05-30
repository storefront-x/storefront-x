import getProductFromMinicart from '~/cypress/support/pageObjects/minicart/getProductFromMinicart'

export default (quantity) =>
  getProductFromMinicart().within(() => {
    cy.get('[data-cy=minicart-item-quantity-input]').clear()
    cy.get('[data-cy=minicart-item-quantity-input]').type(quantity ?? '3')
  })
