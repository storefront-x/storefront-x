import Listing from '~/cypress/support/pageObjects/Listing'

describe('Search page', () => {
  /** @type {Listing} */
  let listing

  beforeEach(() => {
    listing = new Listing()

    cy.visit('/search?query=a').waitForSfx()
  })

  it('can be sorted by prices in ascending order', () => {
    listing.sortByPrice('ASC')
  })

  it('can be sorted by prices in descending order', () => {
    listing.sortByPrice('DESC')
  })

  it('can be filtered', () => {
    listing.filter()
  })
})
