import getEmailInput from './getEmailInput'
import getPasswordInput from './getPasswordInput'
import getSignInButton from './getSignInButton'
import getMicroAccount from './getMicroAccount'

export default function login(params = {}) {
  cy.visit('/sign-in').waitForSfx()

  getEmailInput().type(params.email ?? 'test@test.cz')
  getPasswordInput().type(params.password ?? 'SUPERDUPERPASSWORD11')
  getSignInButton().click()

  getMicroAccount().should('include.text', params.firstName ?? 'Karel')
  getMicroAccount().should('include.text', params.lastName ?? 'Varel')
}
