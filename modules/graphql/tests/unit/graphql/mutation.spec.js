import { describe, it, expect } from 'vitest'
import mutation from '#ioc/graphql/mutation'
import field from '#ioc/graphql/field'
import on from '#ioc/graphql/on'

describe('graphql/mutation', () => {
  it('has fields', () => {
    const m = mutation({
      product: field(),
    })

    expect(m.toString()).toEqual('mutation{product}')
  })

  it('supports nested fields', () => {
    const m = mutation({
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

    expect(m.toString()).toEqual('mutation{a,b{c,d,e{f,g}}}')
  })

  it('supports optional fields', () => {
    const m = mutation({
      a: true && field(),
      b: false && field(),
    })

    expect(m.toString()).toEqual('mutation{a}')
  })

  it('support field aliases', () => {
    const m = mutation({
      a: field('b', {
        c: field(),
      }),
    })

    expect(m.toString()).toEqual('mutation{a:b{c}}')
  })

  it('has fields method', () => {
    const m = mutation().fields({
      a: field().fields({
        b: field(),
      }),
    })

    expect(m.toString()).toEqual('mutation{a{b}}')
  })

  it('supports arguments', () => {
    const m = mutation({
      a: field()
        .args({ b: 'c', d: [{ e: 'f' }], n: 1 })
        .fields({
          f: field(),
        }),
    })

    expect(m.toString()).toEqual('mutation{a(b:"c",d:[{e:"f"}],n:1){f}}')
  })

  it('support object arguments', () => {
    const m = mutation({
      a: field()
        .args({ filter: { ids: { eq: '$id' } } })
        .fields({
          b: field(),
        }),
    })

    expect(m.toString()).toEqual('mutation{a(filter:{ids:{eq:$id}}){b}}')
  })

  it('supports variables', () => {
    const m = mutation()
      .variables({
        $a: 'String!',
        $b: 'Int',
      })
      .fields({
        c: field().args({ a: '$a', b: '$b' }).fields({
          d: field(),
        }),
      })

    expect(m.toString()).toEqual('mutation($a:String!,$b:Int){c(a:$a,b:$b){d}}')
  })

  it('can have multiple same fields with aliases', () => {
    const m = mutation().fields({
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

    expect(m.toString()).toEqual('mutation{a1:a{b},a2:a{c},a3:a{d}}')
  })

  it('supports inline fragments', () => {
    const m = mutation({
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

    expect(m.toString()).toEqual('mutation{products{id,name,...on ConfigurableProduct{configurable_options{id,name}}}}')
  })

  it('is not cachable', async () => {
    const m = mutation().fields({ a: field() })

    expect(m.isCacheable()).toEqual(false)
  })

  it('can have name', () => {
    const q = mutation()
      .name('Products')
      .fields({
        product: field({
          sku: field(),
        }),
      })

    expect(q.toString()).toEqual('mutation Products{product{sku}}')
  })

  it('can have name and variables', () => {
    const q = mutation()
      .name('Products')
      .variables({ $search: 'String!' })
      .fields({
        products: field().args({ search: '$search' }).fields({
          sku: field(),
        }),
      })

    expect(q.toString()).toEqual('mutation Products($search:String!){products(search:$search){sku}}')
  })

  it('can have name passed as argument before fields', () => {
    const q = mutation('Products', {
      product: field({
        sku: field(),
      }),
    })

    expect(q.toString()).toEqual('mutation Products{product{sku}}')
  })

  it('can have name passed as single argument', () => {
    const q = mutation('Products').fields({
      product: field({
        sku: field(),
      }),
    })

    expect(q.toString()).toEqual('mutation Products{product{sku}}')
  })
})
