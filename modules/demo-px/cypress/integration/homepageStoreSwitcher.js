import selectDifferentStore from '~/cypress/support/pageObjects/storeSwitcher/selectDifferentStore'
import GetProducts from '~/cypress/support/repositories/GetProducts'

describe('HomepageStoreSwitcher', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('switches stores', () => {
    selectDifferentStore()
  })

  it('change locale and check url', () => {
    cy.url().should('not.include', /\/[a-z]{2}\//)

    selectDifferentStore()

    cy.url().should('match', /\/[a-z]{2}\//)
    GetProducts().then((products) => {
      let randomProduct = Cypress._.sample(products)
      cy.get('[data-cy=input-search-product]').type(randomProduct.name + '{enter}')

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000) //co s tim? pokud tam nebude, getuju rovnou z predchozi stranky. waitForSfx v tomto pripade nepomaha

      cy.url().should('match', /\/[a-z]{2}\//)

      cy.get('[data-cy=product-title]').first().click().waitForSfx()
      cy.url().should('match', /\/[a-z]{2}\//)
    })
  })
})
