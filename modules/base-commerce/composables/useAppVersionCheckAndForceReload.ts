import BUILD_TIME_VERSION from '#ioc/config/BUILD_TIME_VERSION'
import useCheckAppVersion from '#ioc/services/useCheckAppVersion'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import { onMounted, onUnmounted } from 'vue'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const checkAppVersion = useCheckAppVersion()
  const { t } = useI18n()

  const appVersionCheckAndForceReload = async () => {
    const reload = await checkAppVersion(BUILD_TIME_VERSION)

    if (reload) {
      showErrorNotification(t('errors.oldAppVersionReloading'))
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', appVersionCheckAndForceReload)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', appVersionCheckAndForceReload)
  })
}
