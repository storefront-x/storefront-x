import getAddCouponButton from '~/cypress/support/pageObjects/checkout/getAddCouponButton'
import getCouponCodeInput from '~/cypress/support/pageObjects/checkout/getCouponCodeInput'
import getApplyCouponButton from '~/cypress/support/pageObjects/checkout/getApplyCouponButton'

export default (couponName) => {
  getAddCouponButton().click()
  getCouponCodeInput().type(couponName)
  getApplyCouponButton()
}
