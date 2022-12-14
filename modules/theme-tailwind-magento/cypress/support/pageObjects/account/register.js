export default function register(params = {}) {
  cy.visit('/sign-up').waitForSfx()

  this.getFirstNameInput().type(params.firstName)
  this.getLastNameInput().type(params.lastName)
  this.getEmailInput().type(params.email)
  this.getPasswordInput().type(params.password)
  this.getPasswordConfirmationInput().type(params.password)

  this.getSignUpButton().click()

  this.getMicroAccount().should('include.text', params.firstName)
  this.getMicroAccount().should('include.text', params.lastName)
}
