import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  if (!ctx.debugTools) {
    ctx.debugTools = {
      time: Date.now(),
      requests: [],
    }
  }

  return async () => {
    // Do nothing
  }
}
