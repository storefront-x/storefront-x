import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import continueShopping from '~/cypress/support/pageObjects/base/continueShopping'
import getCategoryTitle from '~/cypress/support/pageObjects/category/getCategoryTitle'
import visitCategory from '~/cypress/support/pageObjects/category/visitCategory'
import sortByPrice from '~/cypress/support/pageObjects/listing/sortByPrice'
import filter from '~/cypress/support/pageObjects/listing/filter'
import getFirstAddToCart from '~/cypress/support/pageObjects/listing/getFirstAddToCart'

describe('Category', () => {
  beforeEach(() => {
    visitCategory('Office').as('category')
  })

  it('contains category title', () => {
    cy.get('@category').then((category) => {
      getCategoryTitle().will('include.text', () => category.name)
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
    getFirstAddToCart({ product: 'simple' }).click().waitForSfx()
    continueShopping()

    expectMicrocartQuantity(1)
  })
})
