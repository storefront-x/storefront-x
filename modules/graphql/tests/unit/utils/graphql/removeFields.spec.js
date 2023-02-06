import { describe, it, expect } from 'vitest'
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import removeFields from '#ioc/utils/graphql/removeFields'

describe('utils/graphql/removeFields', () => {
  it('removes fields from query', () => {
    const q = query({
      a: field(),
      b: field(),
    })

    removeFields(q, ['b'])

    expect(q.toString()).toBe('query{a}')
  })

  it('removes multiple fields from query', () => {
    const q = query({
      a: field(),
      b: field(),
      c: field(),
      d: field(),
    })

    removeFields(q, ['b', 'd'])

    expect(q.toString()).toBe('query{a,c}')
  })

  it('removes field from nested query', () => {
    const q = query({
      category: field({
        products: field({
          sku: field(),
          name: field(),
          brand: field(),
        }),
      }),
    })

    removeFields(q, 'category.products', ['brand'])

    expect(q.toString()).toBe('query{category{products{sku,name}}}')
  })

  it('removes field from fragment', () => {
    const f = fragment('f', 'F', {
      a: field(),
      b: field(),
    })

    removeFields(f, ['b'])

    expect(f.extract()).toBe('fragment f on F{a}')
  })
})
