import AccountCredentials from '~/cypress/support/pageObjects/account/AccountCredentials'
import register from '~/cypress/support/pageObjects/account/register'
import login from '~/cypress/support/pageObjects/account/login'
import logout from '~/cypress/support/pageObjects/account/logout'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import addToCart from '~/cypress/support/pageObjects/product/addToCart'
import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'

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

  it('customers still has cart after page reload', () => {
    const product = new Product()

    login(accountCredentials)

    visitRandom(product)
    addToCart()
    expectMicrocartQuantity(1)

    cy.reload()

    expectMicrocartQuantity(1)
  })

  it('handle customer authorization error', () => {
    login(accountCredentials)

    cy.getCookies().then((cookies) => {
      const customerCookie = cookies.find((cookie) => cookie.name.includes(':customer:id'))
      cy.setCookie(customerCookie.name, 'invalid')
    })

    cy.reload()

    cy.location('pathname').should('eq', '/sign-in')
  })
})
