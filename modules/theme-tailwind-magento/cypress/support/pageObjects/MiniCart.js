export default class MiniCart {
  open() {
    cy.get('[data-cy=minicart-button]').trigger('click')
    cy.get('#minicart-wrapper').should('be.visible')
  }

  close() {
    cy.get('[data-cy=minicart-button]').trigger('click')
    cy.get('#minicart-wrapper').should('not.exist')
  }

  isEmpty() {
    cy.get('#minicart-wrapper h3').should('have.text', 'Your cart is empty')
  }

  getTitle() {
    return cy.get('[data-cy=minicart-item] h3 a')
  }
}
