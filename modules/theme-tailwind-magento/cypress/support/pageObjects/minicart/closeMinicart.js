export default () => {
  cy.get('[data-cy=minicart-button]').trigger('click')
  cy.get('#minicart-wrapper').should('not.exist')
}
