import { Mutation } from '../GraphQL'

export default (...args: any) => {
  return new Mutation(...args).cantBeCached()
}
