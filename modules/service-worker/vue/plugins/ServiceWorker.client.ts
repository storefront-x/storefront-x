import { Workbox } from 'workbox-window'
import IS_DEVELOPMENT from '#ioc/config/IS_DEVELOPMENT'

export default async () => {
  if (IS_DEVELOPMENT) {
    return
  }

  if ('serviceWorker' in navigator) {
    const wb = new Workbox(`/sw.js`)
    await wb.register()
  }
}
