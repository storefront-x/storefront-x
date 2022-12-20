export default function closeHamburgerMenu() {
  cy.get('header button.bg-white').click()
  cy.get('.max-w-xs').should('not.exist')
}
