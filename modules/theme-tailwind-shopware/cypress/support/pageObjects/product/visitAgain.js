export default function visitAgain(productName) {
  return cy.visit(productName).waitForSfx()
}
