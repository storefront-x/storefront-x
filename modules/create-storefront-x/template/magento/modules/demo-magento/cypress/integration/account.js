import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'

describe('Account', () => {
  /** @type {AccountCredentials} */
  let accountCredentials

  // We don't want to create new account for every test
  before(() => {
    accountCredentials = new AccountCredentials()
  })

  it('supports registration', () => {
    register(accountCredentials)
  })

  it('supports login', () => {
    login(accountCredentials)
  })

  it('supports logout', () => {
    login(accountCredentials)
    logout()
  })

  it('supports restricted access to account', () => {
    cy.visit('/account/orders')
    cy.url().should('include', '/sign-in')
  })
})
