export default function logout() {
  cy.visit('/').waitForSfx()

  this.getLogoutButton().click()

  this.getMicroAccount().should('not.include.text', this.firstName)
  this.getMicroAccount().should('not.include.text', this.lastName)
}
