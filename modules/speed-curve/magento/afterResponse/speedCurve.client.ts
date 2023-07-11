import useRequestProfilerStore from '#ioc/stores/useRequestProfilerStore'
import useAddSpeedCurveCustomMetrics from '#ioc/composables/useAddSpeedCurveCustomMetrics'

export default () => {
  const requestProfilerStore = useRequestProfilerStore()
  const addSpeedCurveCustomMetric = useAddSpeedCurveCustomMetrics()

  return async (_: Response, __: Request, { gql }: any) => {
    const record = requestProfilerStore.requests.get(gql)
    record.to = Date.now()

    const queryTookTimeInMs = record.to - record.from
    let queryName = gql._name

    if (queryName === 'CmsBlock') {
      const variables = gql.getVariables()

      queryName += `-${variables.identifiers[0]}`
    }

    addSpeedCurveCustomMetric(queryName, queryTookTimeInMs)

    requestProfilerStore.requests.delete(gql)
  }
}
