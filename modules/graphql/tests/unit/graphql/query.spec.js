import { describe, it, expect } from 'vitest'
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import on from '#ioc/graphql/on'
import fragment from '#ioc/graphql/fragment'

describe('graphql/query', () => {
  it('has fields', () => {
    const q = query({
      product: field(),
    })

    expect(q.toString()).toEqual('query{product}')
  })

  it('supports nested fields', () => {
    const q = query({
      a: field(),
      b: field({
        c: field(),
        d: field(),
        e: field({
          f: field(),
          g: field(),
        }),
      }),
    })

    expect(q.toString()).toEqual('query{a,b{c,d,e{f,g}}}')
  })

  it('supports optional fields', () => {
    const q = query({
      a: true && field(),
      b: false && field(),
    })

    expect(q.toString()).toEqual('query{a}')
  })

  it('support field aliases', () => {
    const q = query({
      a: field('b', {
        c: field(),
      }),
    })

    expect(q.toString()).toEqual('query{a:b{c}}')
  })

  it('has fields method', () => {
    const q = query().fields({
      a: field().fields({
        b: field(),
      }),
    })

    expect(q.toString()).toEqual('query{a{b}}')
  })

  it('supports arguments', () => {
    const q = query({
      a: field()
        .args({ b: 'c', d: [{ e: 'f' }], n: 1 })
        .fields({
          f: field(),
        }),
    })

    expect(q.toString()).toEqual('query{a(b:"c",d:[{e:"f"}],n:1){f}}')
  })

  it('support object arguments', () => {
    const q = query({
      a: field()
        .args({ filter: { ids: { eq: '$id' } } })
        .fields({
          b: field(),
        }),
    })

    expect(q.toString()).toEqual('query{a(filter:{ids:{eq:$id}}){b}}')
  })

  it('supports variables', () => {
    const q = query()
      .variables({
        $a: 'String!',
        $b: 'Int',
      })
      .fields({
        c: field().args({ a: '$a', b: '$b' }).fields({
          d: field(),
        }),
      })

    expect(q.toString()).toEqual('query($a:String!,$b:Int){c(a:$a,b:$b){d}}')
  })

  it('can have multiple same fields with aliases', () => {
    const q = query().fields({
      a1: field('a', {
        b: field(),
      }),
      a2: field('a', {
        c: field(),
      }),
      a3: field('a', {
        d: field(),
      }),
    })

    expect(q.toString()).toEqual('query{a1:a{b},a2:a{c},a3:a{d}}')
  })

  it('supports inline fragments', () => {
    const q = query({
      products: field({
        id: field(),
        name: field(),
        ...on('ConfigurableProduct', {
          configurable_options: field({
            id: field(),
            name: field(),
          }),
        }),
      }),
    })

    expect(q.toString()).toEqual('query{products{id,name,...on ConfigurableProduct{configurable_options{id,name}}}}')
  })

  it('is not cached when some fragment is not cachable', async () => {
    const f = fragment('f', 'F').cantBeCached().fields({
      a: field(),
      b: field(),
    })
    const q = query().fields({ ...f, a: field() })

    expect(q.isCacheable()).toEqual(false)
  })

  it('can have name', () => {
    const q = query()
      .name('Products')
      .fields({
        product: field({
          sku: field(),
        }),
      })

    expect(q.toString()).toEqual('query Products{product{sku}}')
  })

  it('can have name and variables', () => {
    const q = query()
      .name('Products')
      .variables({ $search: 'String!' })
      .fields({
        products: field().args({ search: '$search' }).fields({
          sku: field(),
        }),
      })

    expect(q.toString()).toEqual('query Products($search:String!){products(search:$search){sku}}')
  })

  it('can have name passed as argument before fields', () => {
    const q = query('Products', {
      product: field({
        sku: field(),
      }),
    })

    expect(q.toString()).toEqual('query Products{product{sku}}')
  })

  it('can have name passed as single argument', () => {
    const q = query('Products').fields({
      product: field({
        sku: field(),
      }),
    })

    expect(q.toString()).toEqual('query Products{product{sku}}')
  })
})
