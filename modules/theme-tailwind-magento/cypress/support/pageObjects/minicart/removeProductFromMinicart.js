import getProductFromMinicart from '~/cypress/support/pageObjects/minicart/getProductFromMinicart'
import modalRemoveProduct from '~/cypress/support/pageObjects/minicart/modalRemoveProduct'

export default () => {
  getProductFromMinicart().within(() => {
    cy.get('[data-cy=minicart-item-remove-button]').click()
  })
  modalRemoveProduct()
}
