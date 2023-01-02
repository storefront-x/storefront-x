export default function visitProduct(data) {
  return cy.visit(data.url_key).waitForSfx()
}
