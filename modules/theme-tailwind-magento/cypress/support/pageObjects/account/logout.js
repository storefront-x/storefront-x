import getLogoutButton from './getLogoutButton'
import getMicroAccount from './getMicroAccount'

export default function logout(params = {}) {
  cy.visit('/').waitForSfx()

  getLogoutButton().click()

  getMicroAccount().should('not.include.text', params.firstName ?? 'Karel')
  getMicroAccount().should('not.include.text', params.lastName ?? 'Varel')
}
