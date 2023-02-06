import getRemoveCouponButton from '~/cypress/support/pageObjects/checkout/getRemoveCouponButton'

export default (position) => {
  getRemoveCouponButton(position ?? 0).click()
}
