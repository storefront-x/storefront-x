import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  if (!ctx.$speedCurveServerRequests) {
    ctx.$speedCurveServerRequests = new Map()
  }

  return async (_: Request, { gql }: any) => {
    ctx.$speedCurveServerRequests.set(gql, {
      from: Date.now(),
    })
  }
}
