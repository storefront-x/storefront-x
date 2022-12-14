export default function register() {
  cy.visit('/sign-up').waitForSfx()

  this.getFirstNameInput().type(this.firstName)
  this.getLastNameInput().type(this.lastName)
  this.getEmailInput().type(this.email)
  this.getPasswordInput().type(this.password)
  this.getPasswordConfirmationInput().type(this.password)

  this.getSignUpButton().click()

  this.getMicroAccount().should('include.text', this.firstName)
  this.getMicroAccount().should('include.text', this.lastName)
}
