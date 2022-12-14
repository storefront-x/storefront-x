export default function login(params = {}) {
  cy.visit('/sign-in').waitForSfx()

  this.getEmailInput().type(params.email ?? this.email)
  this.getPasswordInput().type(params.password ?? this.password)
  this.getSignInButton().click()

  this.getMicroAccount().should('include.text', this.firstName)
  this.getMicroAccount().should('include.text', this.lastName)
}
