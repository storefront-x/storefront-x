import selectDifferentStore from '~/cypress/support/pageObjects/storeSwitcher/selectDifferentStore'

describe('HomepageStoreSwitcher', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('switches stores', () => {
    selectDifferentStore()
  })
})
