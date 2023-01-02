export default function visitAgain(data) {
  return cy.visit(data.productname).waitForSfx()
}
