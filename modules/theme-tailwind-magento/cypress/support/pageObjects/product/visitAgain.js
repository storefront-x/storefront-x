export default function visitAgain() {
  return cy.then(() => cy.visit(this.data.url_key + '.html').waitForSfx())
}
