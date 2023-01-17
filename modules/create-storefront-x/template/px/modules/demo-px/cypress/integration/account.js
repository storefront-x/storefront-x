import Account from '~/cypress/support/pageObjects/Account'

describe('Account', () => {
  /** @type {Account} */
  let account

  // We don't want to create new account for every test
  before(() => {
    account = new Account()
  })

  it('supports registration', () => {
    account.register()
  })

  it('supports login and logout', () => {
    account.login()
    account.logout()
  })

  it('supports restricted access to account', () => {
    cy.visit('/account/orders')
    cy.url().should('include', '/sign-in')
  })
})
