export default function getFirstAddToCart({ product } = {}) {
  const base = '[data-cy=add-to-cart]'

  if (product === 'simple') {
    //return cy.get(`${base}[data-simple-product=true]`).first()
    return cy.get(base).first()
  } else {
    return cy.get(base).first()
  }
}
