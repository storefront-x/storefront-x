import getEmailInput from '~/cypress/support/pageObjects/account/getEmailInput'
import getPasswordInput from '~/cypress/support/pageObjects/account/getPasswordInput'
import getFirstNameInput from '~/cypress/support/pageObjects/account/getFirstNameInput'
import getMicroAccount from '~/cypress/support/pageObjects/account/getMicroAccount'
import getLastNameInput from '~/cypress/support/pageObjects/account/getLastNameInput'
import getPasswordConfirmationInput from '~/cypress/support/pageObjects/account/getPasswordConfirmationInput'
import getSignUpButton from '~/cypress/support/pageObjects/account/getSignUpButton'

export default (params = {}) => {
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
