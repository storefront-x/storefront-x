import useRequestProfilerStore from '#ioc/stores/useRequestProfilerStore'

export default () => {
  const requestProfilerStore = useRequestProfilerStore()

  return async (_: Request, { gql }: any) => {
    requestProfilerStore.requests.set(gql, {
      from: Date.now(),
    })
  }
}
