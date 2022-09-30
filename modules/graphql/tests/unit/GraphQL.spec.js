import { describe, it, expect } from 'vitest'
import query from '#ioc/graphql/query'
import mutation from '#ioc/graphql/mutation'

describe('GraphQL', () => {
  it('has query', () => {
    const q = query()

    expect(q.toString()).toEqual('query')
  })

  it('has mutation', () => {
    const m = mutation()

    expect(m.toString()).toEqual('mutation')
  })
})
