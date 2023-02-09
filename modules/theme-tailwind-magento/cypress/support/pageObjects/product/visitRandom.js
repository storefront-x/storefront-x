import GetProducts from '~/cypress/support/repositories/GetProducts'
import Product from '~/cypress/support/pageObjects/product/Product'
import randomNumber from '#ioc/utils/number/random'

let products = null

function visitRandom(product) {
  return cy.then(() => {
    if (products) {
      product.data = _visitRandom(product.type)
    } else {
      GetProducts().then((_products) => {
        products = _products
        product.data = _visitRandom(product.type)
      })
    }
  })
}

function _visitRandom(type = Product.Simple) {
  let index = null
  let product = null

  // eslint-disable-next-line no-constant-condition
  while (true) {
    index = randomNumber(0, products.length)
    product = products[index]

    if (product.__typename === type) break
  }

  products = [...products.slice(0, index), ...products.slice(index + 1, products.length)]

  cy.visit(product.url_key + product.url_suffix).waitForSfx()

  return product
}

export default visitRandom
