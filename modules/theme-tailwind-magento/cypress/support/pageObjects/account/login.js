export default function login(params = {}) {
  cy.visit('/sign-in').waitForSfx()

  this.getEmailInput().type(params.email ?? 'test@test.cz')
  this.getPasswordInput().type(params.password ?? 'SUPERDUPERPASSWORD11')
  this.getSignInButton().click()

  this.getMicroAccount().should('include.text', params.firstName ?? 'Karel')
  this.getMicroAccount().should('include.text', params.lastName ?? 'Varel')
}
