import getEmailInput from './getEmailInput'
import getPasswordInput from './getPasswordInput'
import getFirstNameInput from './getFirstNameInput'
import getMicroAccount from './getMicroAccount'
import getLastNameInput from './getLastNameInput'
import getPasswordConfirmationInput from './getPasswordConfirmationInput'
import getSignUpButton from './getSignUpButton'

export default function register(params = {}) {
  cy.visit('/sign-up').waitForSfx()

  getFirstNameInput().type(params.firstName)
  getLastNameInput().type(params.lastName)
  getEmailInput().type(params.email)
  getPasswordInput().type(params.password)
  getPasswordConfirmationInput().type(params.password)

  getSignUpButton().click()

  getMicroAccount().should('include.text', params.firstName)
  getMicroAccount().should('include.text', params.lastName)
}
