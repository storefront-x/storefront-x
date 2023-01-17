import StoreSwitcher from '~/cypress/support/pageObjects/StoreSwitcher'

describe('HomepageStoreSwitcher', () => {
  /** @type {StoreSwitcher} */
  let storeSwitcher

  beforeEach(() => {
    storeSwitcher = new StoreSwitcher()

    cy.visit('/')
  })

  it('switches stores', () => {
    storeSwitcher.selectDifferentStore()
  })
})
