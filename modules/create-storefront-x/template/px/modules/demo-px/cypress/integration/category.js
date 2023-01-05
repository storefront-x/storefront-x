import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import visitRandomCategory from '~/cypress/support/pageObjects/category/visitRandomCategory'
import sortByPrice from '~/cypress/support/pageObjects/listing/sortByPrice'
import filter from '~/cypress/support/pageObjects/listing/filter'
import getFirstAddToCart from '~/cypress/support/pageObjects/listing/getFirstAddToCart'

describe('Category', () => {
  beforeEach(() => {
    visitRandomCategory({
      minProducts: 14,
    })
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
    getFirstAddToCart({ product: 'simple' }).click()

    expectMicrocartQuantity(1)
  })
})
