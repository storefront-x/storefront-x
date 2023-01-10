export default class ThankYouPage {
  isVisible() {
    cy.get('[data-cy=thank-you]', { timeout: 30000 }).should('be.visible')
  }
}
