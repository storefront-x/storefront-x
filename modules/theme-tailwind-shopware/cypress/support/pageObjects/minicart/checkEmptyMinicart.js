export default () => {
  cy.get('#minicart-wrapper h3').should('have.text', 'Your cart is empty')
}
