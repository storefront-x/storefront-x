export default function visitProduct(url_key) {
  return cy.visit(url_key).waitForSfx()
}
