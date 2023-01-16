import selectDifferentCurrency from '~/cypress/support/pageObjects/multicurrency/selectDifferentCurrency'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'
import Product from '~/cypress/support/pageObjects/product/Product'

describe('Multicurrency', () => {
  /** @type {Product} */
  let product = null

  beforeEach(() => {
    product = new Product()
    visitRandom(product)
  })

  it('allows switching currency', () => {
    selectDifferentCurrency()
  })
})
