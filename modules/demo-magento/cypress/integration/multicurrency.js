import selectDifferentCurrency from '~/cypress/support/pageObjects/multicurrency/selectDifferentCurrency'

import Product from '~/cypress/support/pageObjects/Product'

describe('Multicurrency', () => {
  /** @type {Product} */
  let product

  beforeEach(() => {
    product = new Product()

    product.visitRandom()
  })

  it('allows switching currency', () => {
    selectDifferentCurrency()
  })
})
