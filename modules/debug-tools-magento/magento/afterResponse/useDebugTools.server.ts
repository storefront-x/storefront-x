import useContext from '#ioc/composables/useContext'

export default () => {
  const ctx = useContext()

  return async (response: Response, request: Request, { gql }: any) => {
    ctx.debugTools.requests.push({
      url: request.url,
      name: gql._name,
      request: request.clone(),
      response: response.clone(),
      fields: [
        {
          title: 'Query',
          value: gql.toString(),
          openByDefault: true,
        },
        {
          title: 'Variables',
          value: JSON.stringify(gql._bindings, null, '  '),
          openByDefault: true,
        },
      ],
    })
  }
}
