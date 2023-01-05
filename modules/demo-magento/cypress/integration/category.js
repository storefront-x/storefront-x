import expectMicrocartQuantity from '~/cypress/support/pageObjects/base/expectMicrocartQuantity'
import sortByPrice from '~/cypress/support/pageObjects/listing/sortByPrice'
import filter from '~/cypress/support/pageObjects/listing/filter'
import getFirstAddToCart from '~/cypress/support/pageObjects/listing/getFirstAddToCart'
import GetRandomCategory from '~/cypress/support/repositories/GetRandomCategory'
import getCategoryTitle from '~/cypress/support/pageObjects/category/getCategoryTitle'

describe('Category', () => {
  beforeEach(() => {
    GetRandomCategory({
      minProducts: 14,
    }).as('category')

    cy.get('@category').then((category) => {
      cy.visit(category.url_key + category.url_suffix).waitForSfx()
    })
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
    getFirstAddToCart({ product: 'simple' }).click()

    expectMicrocartQuantity(1)
  })
})
