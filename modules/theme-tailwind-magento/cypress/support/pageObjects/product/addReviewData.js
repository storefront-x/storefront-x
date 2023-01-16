import getNicknameField from '~/cypress/support/pageObjects/product/getNicknameField'
import getTitleField from '~/cypress/support/pageObjects/product/getTitleField'
import getTextField from '~/cypress/support/pageObjects/product/getTextField'
import getNthStar from '~/cypress/support/pageObjects/product/getNthStar'
import getSubmitReviewButton from '~/cypress/support/pageObjects/product/getSubmitReviewButton'

export default (reviewContent) => {
  getNicknameField().type(reviewContent.nickname)
  getTitleField().type(reviewContent.title)
  getTextField().type(reviewContent.text)

  getNthStar('Attributes', 3).trigger('mouseenter')
  getNthStar('Attributes', 3).click()

  getNthStar('Price', 3).trigger('mouseenter')
  getNthStar('Price', 3).click()

  getNthStar('Quality', 3).trigger('mouseenter')
  getNthStar('Quality', 3).click()

  getNthStar('Value', 3).trigger('mouseenter')
  getNthStar('Value', 3).click()

  getSubmitReviewButton().click()
}
