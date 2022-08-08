import { Field } from '../GraphQL'

export default (...args: any) => {
  return new Field(...args)
}
