export default class GraphQLError extends Error {
  data: any

  constructor(err: any) {
    super(err)
    this.message = err.message
    this.data = err.extensions
  }
}
