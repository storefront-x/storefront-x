export default (error: any): boolean => error?.extensions?.category === 'graphql-no-such-entity'
