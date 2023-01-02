export default function visitAgain(data) {
  return cy.then(() => cy.visit(data.url_key + '.html').waitForSfx())
}
