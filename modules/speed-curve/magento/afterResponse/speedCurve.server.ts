import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async (_: Response, __: Request, { gql }: any) => {
    const record = ctx.$speedCurveServerRequests.get(gql)

    record.to = Date.now()
  }
}
