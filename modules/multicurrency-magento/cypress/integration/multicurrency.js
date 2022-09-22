import Multicurrency from '#cypress/support/pageObjects/Multicurrency'
import Product from '#cypress/support/pageObjects/Product'

describe('Multicurrency', () => {
  /** @type {Multicurrency} */
  let multicurrency

  /** @type {Product} */
  let product

  beforeEach(() => {
    multicurrency = new Multicurrency()
    product = new Product()

    product.visitRandom()
  })

  it('allows switching currency', () => {
    multicurrency.selectDifferentCurrency()
  })
})
