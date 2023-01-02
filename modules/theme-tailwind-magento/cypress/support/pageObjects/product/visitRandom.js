import GetProducts from '~/cypress/support/repositories/GetProducts'
import Product from '~/cypress/support/pageObjects/product/Product'
import randomNumber from '#ioc/utils/number/random'

function visitRandom(type = Product.Simple) {
  return cy.then(() => {
    if (this._products) {
      _visitRandom(type)
    } else {
      GetProducts().then((products) => {
        this._products = products
        _visitRandom(type)
      })
    }
  })
}

function _visitRandom(type = Product.Simple) {
  let index = null
  let product = null

  // eslint-disable-next-line no-constant-condition
  while (true) {
    index = randomNumber(0, this._products.length)
    product = this._products[index]

    if (product.__typename === type) break
  }

  this.data = product
  this._products = [...this._products.slice(0, index), ...this._products.slice(index + 1, this._products.length)]

  cy.visit(product.url_key + '.html').waitForSfx()
}

export default visitRandom
