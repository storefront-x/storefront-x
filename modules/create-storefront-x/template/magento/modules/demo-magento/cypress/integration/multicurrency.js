import selectDifferentCurrency from '~/cypress/support/pageObjects/multicurrency/selectDifferentCurrency'
import visitRandom from '~/cypress/support/pageObjects/product/visitRandom'

describe('Multicurrency', () => {
  beforeEach(() => {
    visitRandom()
  })

  it('allows switching currency', () => {
    selectDifferentCurrency()
  })
})
