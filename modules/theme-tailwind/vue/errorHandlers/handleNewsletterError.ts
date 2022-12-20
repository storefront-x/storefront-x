import NewsletterError from '#ioc/errors/NewsletterError'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof NewsletterError) {
      const errMessages = [
        {
          magentoResponse: 'Cannot create a newsletter subscription.',
          i18nKey: 'internalError',
        },
        {
          magentoResponse: 'Enter a valid email address.',
          i18nKey: 'invalidEmail',
        },
        {
          magentoResponse: 'Guests can not subscribe to the newsletter. You must create an account to subscribe.',
          i18nKey: 'guestsNotAllowed',
        },
        {
          magentoResponse: 'The account sign-in was incorrect or your account is disabled temporarily.',
          i18nKey: 'emailPending',
        },
        {
          magentoResponse: 'This email address is already subscribed.',
          i18nKey: 'usedEmail',
        },
        {
          magentoResponse: 'You must specify an email address to subscribe to a newsletter.',
          i18nKey: 'emptyEmail',
        },
      ]

      const message = errMessages.find((err) => err.magentoResponse === error.message)

      if (message)
        showErrorNotification({
          name: t('errors.newsletter.title'),
          message: t(`errors.newsletter.${message.i18nKey}`),
        })
    } else throw error
  }
}
