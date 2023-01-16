import getReviewTab from '~/cypress/support/pageObjects/product/getReviewTab'
import getAddReviewButton from '~/cypress/support/pageObjects/product/getAddReviewButton'

export default () => {
  getReviewTab().scrollIntoView({ duration: 500 }).should('be.visible').click()
  getAddReviewButton().scrollIntoView({ duration: 500 }).should('be.visible')
  getAddReviewButton().scrollIntoView({ duration: 500 }).should('be.visible').click()
}
