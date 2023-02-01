export default () => cy.get('[data-cy^=cart-summary-list-item-]').should('be.visible')
