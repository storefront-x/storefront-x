import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  if (!ctx.requestProfiler) {
    ctx.requestProfiler = new Map()
  }

  return async (_: Request, { gql }: any) => {
    ctx.requestProfiler.set(gql, {
      from: Date.now(),
    })
  }
}
