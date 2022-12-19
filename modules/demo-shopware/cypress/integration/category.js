import visitCategory from '~/cypress/support/pageObjects/category/visitCategory'
import continueShopping from '~/cypress/support/pageObjects/base/continueShopping'
import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import getCategoryTitle from '~/cypress/support/pageObjects/base/getCategoryTitle'

import Listing from '~/cypress/support/pageObjects/Listing'

describe('Category', () => {
  /** @type {Listing} */
  let listing

  beforeEach(() => {
    listing = new Listing()

    visitCategory('Office').as('category')
  })

  it('contains category title', () => {
    cy.get('@category').then((category) => {
      getCategoryTitle().will('include.text', () => category.name)
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
    listing.getFirstAddToCart({ product: 'simple' }).click().waitForSfx()
    continueShopping()

    expectMicrocartQuantity(1)
  })
})
