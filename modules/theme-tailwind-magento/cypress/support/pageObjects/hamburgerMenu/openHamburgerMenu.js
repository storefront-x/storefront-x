export default function openHamburgerMenu() {
  cy.get('header button.bg-white').click()
  cy.get('.max-w-xs').should('be.visible')
}
