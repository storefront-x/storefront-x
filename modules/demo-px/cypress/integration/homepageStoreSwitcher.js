import selectDifferentStore from '~/cypress/support/pageObjects/storeSwitcher/selectDifferentStore'
import Product from '~/cypress/support/pageObjects/product/Product'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'

describe('HomepageStoreSwitcher', () => {
  let product = null

  beforeEach(() => {
    product = new Product()
    cy.visit('/')
  })

  it('switches stores', () => {
    selectDifferentStore()
  })

  it.only('change locale and check url', () => {
    cy.url().should('not.include', /\/[a-z]{2}\//)

    selectDifferentStore()

    cy.url().should('match', /\/[a-z]{2}\//)
    visitRandom(product)
    cy.url().should('match', /\/[a-z]{2}\//gm + `${product.url_key}`)
  })
})
