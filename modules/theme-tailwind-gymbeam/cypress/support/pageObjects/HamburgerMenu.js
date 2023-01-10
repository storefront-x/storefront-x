export default class HamburgerMenu {
  open() {
    cy.get('header button.bg-white').click()
    cy.get('.max-w-xs').should('be.visible')
  }

  close() {
    cy.get('header button.bg-white').click()
    cy.get('.max-w-xs').should('not.exist')
  }
}
