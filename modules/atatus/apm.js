import atatus from 'atatus-nodejs'

atatus.start({
  licenseKey: process.env.ATATUS_LICENCE_KEY,
  appName: process.env.ATATUS_APP_NAME,
})
