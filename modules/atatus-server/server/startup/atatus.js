import atatus from 'atatus-nodejs'
import ATATUS_LICENCE_KEY from '#ioc/config/atatus-server/ATATUS_LICENCE_KEY'
import ATATUS_APP_NAME from '#ioc/config/atatus-server/ATATUS_APP_NAME'

atatus.start({
  licenseKey: ATATUS_LICENCE_KEY,
  appName: ATATUS_APP_NAME,
})
