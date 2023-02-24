import CartResetted from '#ioc/errors/CartResetted'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import useCartStore from '#ioc/stores/useCartStore'
import useCartToken from '#ioc/composables/useCartToken'

export default () => {
  const cartStore = useCartStore()
  const cartToken = useCartToken()
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof CartResetted) {
      cartToken.remove()
      cartStore.$reset()

      showErrorNotification(t('errors.cartExpired'))
    } else {
      throw error
    }
  }
}
