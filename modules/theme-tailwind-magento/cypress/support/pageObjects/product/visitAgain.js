export default function visitAgain(product) {
  cy.log(product)
  return cy.then(() => {
    cy.log(product)
    cy.visit(product.data.url_key + product.data.url_suffix).waitForSfx()
  })
}
