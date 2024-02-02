import getLogoutButton from '~/cypress/support/pageObjects/account/getLogoutButton'
import getMicroAccount from '~/cypress/support/pageObjects/account/getMicroAccount'

export default (params = {}) => {
  cy.visit('/').waitForSfx()

  getLogoutButton().click()

  getMicroAccount().should('not.include.text', params.firstName ?? 'Karel')
  getMicroAccount().should('not.include.text', params.lastName ?? 'Varel')
  cy.visit('/').waitForSfx()
}
