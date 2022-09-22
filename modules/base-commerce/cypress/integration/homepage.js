import StoreSwitcher from '#cypress/support/pageObjects/StoreSwitcher'

describe('Homepage', () => {
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
