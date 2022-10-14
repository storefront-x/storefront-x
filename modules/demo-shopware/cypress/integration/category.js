import Base from '~/cypress/support/pageObjects/Base'
import Category from '~/cypress/support/pageObjects/Category'
import Listing from '~/cypress/support/pageObjects/Listing'

describe('Category', () => {
  /** @type {Base} */
  let base

  /** @type {Category} */
  let category

  /** @type {Listing} */
  let listing

  beforeEach(() => {
    base = new Base()
    category = new Category()
    listing = new Listing()

    category.visit('Office')
  })

  it('contains category title', () => {
    category.getTitle().will('include.text', () => category.name)
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

  it.only('allows adding simple products from category detail', () => {
    listing.getFirstAddToCart({ product: 'simple' }).click().waitForSfx()
    base.continueShopping()

    base.expectMicrocartQuantity(1)
  })
})
