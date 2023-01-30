import { Store } from 'pinia'

export default <T extends Store, R>(store: T, check: () => boolean, callback: () => Promise<R>) => {
  if (check()) return callback()

  return new Promise<R>((resolve, reject) => {
    setTimeout(() => {
      console.error(new Error('waitForStore timed out after 5s'))
      resolve(null as R)
    }, 5000)

    const unsubscribe = store.$subscribe(async () => {
      if (!check()) {
        return
      }

      try {
        const r = await callback()
        resolve(r)
      } catch (error) {
        reject(error)
      } finally {
        unsubscribe()
      }
    })
  })
}
