import CartResetted from '#ioc/errors/CartResetted'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof CartResetted) {
      cartStore.$reset()

      showErrorNotification(t('errors.cartExpired'))
    } else {
      throw error
    }
  }
}
