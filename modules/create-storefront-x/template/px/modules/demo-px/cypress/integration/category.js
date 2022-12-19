import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import getCategoryTitle from '~/cypress/support/pageObjects/category/getCategoryTitle'
import visitRandom from '~/cypress/support/pageObjects/category/visitRandom'

import Listing from '~/cypress/support/pageObjects/Listing'

describe('Category', () => {
  /** @type {Listing} */
  let listing

  beforeEach(() => {
    listing = new Listing()

    visitRandom({
      minProducts: 14,
    }).as('category')
  })

  it('contains category title', () => {
    cy.get('@category').then((category) => {
      getCategoryTitle().will('include.text', () => category.data.name)
    })
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

  it('allows adding simple products from category detail', () => {
    listing.getFirstAddToCart({ product: 'simple' }).click()

    expectMicrocartQuantity(1)
  })
})
