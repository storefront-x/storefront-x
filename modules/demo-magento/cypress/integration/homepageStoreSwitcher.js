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

  it('change locale and check url', () => {
    cy.url().should('not.include', /\/[a-z]{2}\//gm)

    selectDifferentStore()

    cy.url().should('include', /\/[a-z]{2}\//gm)
    visitRandom(product)
    cy.url().should('include', /\/[a-z]{2}\//gm + `/${product.data.url_key}`)
  })
})

//get random product
//store products url value
//visit and check url
//go to homepage
//change language
//check url for regexp `\/[a-z](2)\/`
//visit stored url value with locale prefix
//check that url contains locale prefix

// describe('Locale', () => {
//   let product = null

//   beforeEach(() => {
//     product = new Product()
//     cy.visit('/').waitForSfx()
//   })

//   it('change locale and check url', () => {
//     cy.url().should('not.include', /\/[a-z]{2}\//gm)
//   })
// })
