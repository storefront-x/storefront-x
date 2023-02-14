import { Store } from 'pinia'

export default <T extends Store, R>(store: T, check: () => boolean, callback: () => Promise<R>) => {
  if (check()) return callback()

  return new Promise<R>((resolve, reject) => {
    let hasTimedOut = false

    const timeout = setTimeout(() => {
      hasTimedOut = true
      console.error(`waitForStore(${store.$id}) timed out after 5s`)
      resolve(null as R)
    }, 5000)

    const unsubscribe = store.$subscribe(async () => {
      if (!check()) return
      if (hasTimedOut) return

      clearTimeout(timeout)

      try {
        const r = await callback()
        resolve(r)
      } catch (error) {
        clearTimeout(timeout)
        reject(error)
      } finally {
        unsubscribe()
      }
    })
  })
}
