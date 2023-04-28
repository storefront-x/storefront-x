import { describe, it, expect } from 'vitest'
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import addFields from '#ioc/utils/graphql/addFields'
import on from '#ioc/graphql/on'

describe('utils/graphql/addFields', () => {
  it('add fields to query', () => {
    const q = query({
      a: field(),
    })

    addFields(q, {
      b: field(),
    })

    expect(q.toString()).toBe('query{a,b}')
  })

  it('add nested fields to query', () => {
    const q = query({
      a: field({
        b: field({
          c: field(),
        }),
      }),
    })

    addFields(q, 'a.b.c', {
      d: field(),
    })

    expect(q.toString()).toBe('query{a{b{c{d}}}}')
  })

  it('add partly nested fields to query', () => {
    const q = query({
      a: field({
        b: field({
          c: field(),
        }),
      }),
    })

    addFields(q, 'a', {
      d: field(),
    })

    expect(q.toString()).toBe('query{a{b{c},d}}')
  })

  it('add fields to fragment', () => {
    const f = fragment('f', 'F', {
      a: field(),
    })

    addFields(f, {
      b: field(),
    })

    expect(f.extract()).toBe('fragment f on F{a,b}')
  })

  it('add nested fields to fragment', () => {
    const f = fragment('f', 'F', {
      a: field({
        b: field({
          c: field(),
        }),
      }),
    })

    addFields(f, 'a.b.c', {
      d: field(),
    })

    expect(f.extract()).toBe('fragment f on F{a{b{c{d}}}}')
  })

  it('add partly nested fields to fragment', () => {
    const f = fragment('f', 'F', {
      a: field({
        b: field({
          c: field(),
        }),
      }),
    })

    addFields(f, 'a', {
      d: field(),
    })

    expect(f.extract()).toBe('fragment f on F{a{b{c},d}}')
  })

  it('add fields with on', () => {
    const f = fragment('f', 'F', {
      a: field(),
      ...on('G', {
        g: field(),
      }),
    })

    addFields(f, 'on G', {
      h: field(),
    })

    expect(f.extract()).toBe('fragment f on F{a,...on G{g,h}}')
  })

  it('add fields with on to fragment without on', () => {
    const f = fragment('f', 'F', {
      a: field(),
    })

    addFields(f, {
      ...on('G', {
        h: field(),
      }),
    })

    expect(f.extract()).toBe('fragment f on F{a,...on G{h}}')
  })
})
