import visitCategory from '~/cypress/support/pageObjects/category/visitCategory'
import continueShopping from '~/cypress/support/pageObjects/base/continueShopping'
import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import getCategoryTitle from '~/cypress/support/pageObjects/category/getCategoryTitle'
import sortByPrice from '~/cypress/support/pageObjects/listing/sortByPrice'
import filter from '~/cypress/support/pageObjects/listing/filter'
import getFirstAddToCart from '~/cypress/support/pageObjects/listing/getFirstAddToCart'

let categoryName

describe('Category', () => {
  beforeEach(() => {
    categoryName = 'Office'
    visitCategory(categoryName)
  })

  it('contains category title', () => {
    getCategoryTitle().will('include.text', () => categoryName)
  })

  it('can be sorted by prices in ascending order', () => {
    sortByPrice('ASC')
  })

  it('can be sorted by prices in descending order', () => {
    sortByPrice('DESC')
  })

  it('can be filtered', () => {
    filter()
  })

  it('allows adding simple products from category detail', () => {
    getFirstAddToCart({ product: 'simple' }).click().waitForSfx()
    continueShopping()

    expectMicrocartQuantity(1)
  })
})
