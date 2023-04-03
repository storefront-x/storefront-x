import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async (response: Response, request: Request, { gql }: any) => {
    ctx.debugTools.requests.push({
      request: request.clone(),
      response: response.clone(),
      gql,
    })
  }
}
