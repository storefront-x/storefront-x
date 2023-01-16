import getEmailInput from '~/cypress/support/pageObjects/account/getEmailInput'
import getPasswordInput from '~/cypress/support/pageObjects/account/getPasswordInput'
import getSignInButton from '~/cypress/support/pageObjects/account/getSignInButton'
import getMicroAccount from '~/cypress/support/pageObjects/account/getMicroAccount'

export default (params = {}) => {
  cy.visit('/sign-in').waitForSfx()

  getEmailInput().type(params.email ?? 'test@test.cz')
  getPasswordInput().type(params.password ?? 'SUPERDUPERPASSWORD11')
  getSignInButton().click()

  getMicroAccount().should('include.text', params.firstName ?? 'Karel')
  getMicroAccount().should('include.text', params.lastName ?? 'Varel')
}
