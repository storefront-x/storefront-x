import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import Category from '~/cypress/support/pageObjects/Category'
import Listing from '~/cypress/support/pageObjects/Listing'

describe('Category', () => {
  /** @type {Category} */
  let category

  /** @type {Listing} */
  let listing

  beforeEach(() => {
    category = new Category()
    listing = new Listing()

    category.visitRandom({
      minProducts: 14,
    })
  })

  it('contains category title', () => {
    category.getTitle().will('include.text', () => category.data.name)
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

    expectMicrocartQuantity.expectMicrocartQuantity(1)
  })
})
