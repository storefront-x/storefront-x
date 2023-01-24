import getNotificationToast from '~/cypress/support/pageObjects/base/getNotificationToast'

export default () => getNotificationToast().should('not.be.empty')
