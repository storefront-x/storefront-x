import { describe, it, expect } from 'vitest'
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

describe('graphql/fragment', () => {
  it('is hoisted in out of the query', () => {
    const f = fragment('f', 'F', {
      a: field(),
      b: field(),
    })

    const q = query({
      c: field({
        ...f,
      }),
    })

    expect(q.toString()).toBe('query{c{...f}}fragment f on F{a,b}')
  })

  it('is not duplicated', () => {
    const f = fragment('f', 'F', {
      a: field(),
      b: field(),
    })

    const q = query({
      c: field({
        ...f,
        g: field({
          h: field(),
          ...f,
          i: field(),
        }),
      }),
    })

    expect(q.toString()).toBe('query{c{...f,g{h,...f,i}}}fragment f on F{a,b}')
  })

  it('supports multiple fragments', () => {
    const f1 = fragment('f1', 'F1', {
      a: field(),
      b: field(),
    })

    const f2 = fragment('f2', 'F2', {
      c: field(),
      d: field({
        e: field(),
      }),
    })

    const q = query({
      x: field({
        ...f1,
        y: field({
          z: field({
            ...f2,
          }),
        }),
      }),
    })

    expect(q.toString()).toBe('query{x{...f1,y{z{...f2}}}}fragment f1 on F1{a,b}fragment f2 on F2{c,d{e}}')
  })

  it('supports nested fragments', () => {
    const f1 = fragment('f1', 'F1', {
      a: field(),
    })

    const f2 = fragment('f2', 'F2', {
      ...f1,
      b: field(),
    })

    const q = query({
      ...f2,
      c: field(),
    })

    expect(q.toString()).toBe('query{...f2,c}fragment f2 on F2{...f1,b}fragment f1 on F1{a}')
  })

  it('supports fragment inlining', () => {
    const f1 = fragment('f1', 'F1', {
      a: field(),
    })

    const q = query({
      ...f1.inline(),
      b: field(),
    })

    expect(q.toString()).toBe('query{a,b}')
  })
})
