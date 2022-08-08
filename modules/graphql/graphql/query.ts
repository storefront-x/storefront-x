import { Query } from '../GraphQL'

export default (...args: any) => {
  return new Query(...args)
}
