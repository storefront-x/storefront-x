import field from '#ioc/graphql/field'

export default (name: string, ...args: any) => {
  return { [`...on ${name}`]: field(...args) }
}
