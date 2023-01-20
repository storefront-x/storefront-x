# GraphQL

> `@storefront-x/graphql`

Storefront X contains powerful builder for GraphQL queries, mutations & fragments. Its syntax is similar to GraphQL text files, but has few additions/changes due to limitations of JavaScript.

All graphql files are in the `graphql/` directory. Queries, mutations and fragments should be in `graphql/queries/`, `graphql/mutations/` and `graphql/fragments/` subdirectories.

## Fields

> GraphQL documentation about fields [here](https://graphql.org/learn/queries/#fields).

Let's imagine simples GraphQL query:

```graphql
query {
  products {
    id
    sku
    name
  }
}
```

In Storefront X GraphQL builder is written like this:

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query({
    products: field({
      id: field(),
      sku: field(),
      name: field(),
    }),
  })
```

Because some backend instances might not support all of the fields, GraphQL builder supports optional fields.

> Falsy fields are filtered out.

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
// IS_FEATURE_ENABLED is true or false
import IS_FEATURE_ENABLED from '#ioc/config/IS_FEATURE_ENABLED'

export default () =>
  query({
    products: field({
      id: field(),
      feature: IS_FEATURE_ENABLED && field(),
    }),
  })
```

## Arguments

> GraphQL documentation about arguments [here](https://graphql.org/learn/queries/#arguments).

GraphQL supports arguments which can be used for sorting, searching, filtering, pagination, etc. Arguments in GraphQL are added in parentheses like this:

```graphql
query {
  products(category_id: 1, sort: "price", order: "ASC") {
    id
    sku
    name
  }
}
```

Equivalent query in Storefront X GraphQL builder looks like this:

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query({
    products: field()
      .args({
        category_id: 1,
        sort: 'price',
        order: 'asc',
      })
      .fields({
        id: field(),
        sku: field(),
        name: field(),
      }),
  })
```

## Variables

> GraphQL documentation about variables [here](https://graphql.org/learn/queries/#variables).

Generally for GraphQL queries to be useful, they have to be configurable during runtime. This is done using variables, which are first defined in the query, and during runtime, specific values can be passed in. Variables are most commonly used in addition with arguments.

Here is an example of GraphQL query with some variables:

```graphql
query($categoryId: Int!, $sort: String, order: String) {
  products(category_id: $categoryId, sort: $sort, order: $order) {
    id
    sku
    name
  }
}
```

And here is equivalent Storefront X GraphQL builder query:

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query()
    .variables({
      $categoryId: 'Int!',
      $sort: 'String',
      $order: 'String',
    })
    .fields({
      products: field()
        .args({
          category_id: '$categoryId',
          sort: '$sort',
          order: '$order',
        })
        .fields({
          id: field(),
          sku: field(),
          name: field(),
        }),
    })
```

Variables have to start with the dollar sign, because they are directly translated to GraphQL query.

Later, when we know concrete values we want to assign to variables, we use `.with()` method to bind them.

```javascript
ProductsQuery.with({
  categoryId: 2,
  sort: 'price',
  order: 'DESC',
})
```

## Aliases

> GraphQL documentation about aliases [here](https://graphql.org/learn/queries/#aliases).

In GraphQL, fields can have aliases. This is to allow multiple queries in one call. Here is an example of aliased fields in GraphQL:

```graphql
query {
  myProductA: products {
    id
    sku
    name
  }
  myProductsB: products {
    id
    sku
    name
  }
}
```

To add alias in Storefront X GraphQL builder, add string parameter to `field()` function call like this:

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query({
    myProductA: field('products', {
      id: field(),
      sku: field(),
      name: field(),
    }),
    myProductB: field('products', {
      id: field(),
      sku: field(),
      name: field(),
    }),
  })
```

Second parameter to `field()` function call now becomes an object of subfields, or it can be omited and subfields are set with `.fields()` method call.

## Inline fragments

> GraphQL documentation about inline fragments [here](https://graphql.org/learn/queries/#inline-fragments).

Inline fragments can be added using `on()` helper function.

Example in GraphQL:

```graphql
query {
  products {
    id
    name
    ... on ConfigurableProduct {
      configurable_options {
        id
        name
      }
    }
  }
}
```

Example in Storefront X GraphQL builder using `on()` helper:

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import on from '#ioc/graphql/on'

export default () =>
  query({
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
```

## Fragments

Multiple GraphQL actions might want to return same result. Adding/removing/updating item in cart will always return full cart content. To not duplicate code we use fragments.

```graphql
fragment product on ProductInterface {
  sku
  name
}

query {
  products(search: "") {
    items {
      ...product
      related_products {
        ...product
      }
      upsell_products {
        ...product
      }
    }
  }
}
```

To achieve this in Storefront X GraphQL build we just need to wrap the fragment in a `fragment` function call. First argument is fragment identifier and second is type upon which it operates.

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/field'

const Product = (name = 'product') =>
  fragment('name', 'ProductInterface', {
    sku: field(),
    name: field(),
  })

const Products = () =>
  query({
    products: field({
      items: field({
        ...Product(),
        related_products: field({
          ...Product(),
        }),
        upsell_products: field({
          ...Product(),
        }),
      }),
    }),
  })
```

## Mutations

Storefront X GraphQL builder also supports mutations. They have exactly the same syntax as queries, except we start mutation with `mutation()` function helper.

```javascript
import mutation from '#ioc/graphql/mutation'
import field from '#ioc/graphql/field'

export default () =>
  mutation()
    .variables({
      $email: 'String!',
      $password: 'String!',
    })
    .fields({
      generateCustomerToken: field()
        .args({
          email: '$email',
          password: '$password',
        })
        .fields({
          token: field(),
        }),
    })
```

## Executing queries/mutations

The GraphQL builder contains few methods, that can help us build the final GraphQL request.

```typescript
import objectToQuery from '#ioc/utils/url/objectToQuery'
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

const Products = () =>
  query()
    .variables({
      $categoryId: 'Int!',
    })
    .fields({
      products: field()
        .args({
          category_id: '$categoryId',
        })
        .fields({
          id: field(),
          sku: field(),
          name: field(),
        }),
    })

const products = Products().with({ categoryId })

const query = products.toString()
const variables = products.getVariables()
const isCacheable = products.isCacheable()
```

## Caching

By default, GQL queries are cached. Mutations are never cached. This should be OK for 80% of the cases. But sometimes, we want to sacrifice speed for having query results to be 100% up to date. We can do this using the `.cantBeCached()` method, which will make the query using POST HTTP method, which is not cached.

```javascript
import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query()
    .cantBeCached()
    .fields({
      cart: field({
        items: field({
          sku: field(),
        }),
      }),
    })
```

## Utilities

### addFields(_query_, _path_, _fields_)

As the name of utility says, you can use `addFields()` utility to additionally include more fields into any GraphQL **query** request.

```javascript
addFields(query, 'products.items', {
  rating_summary: field(),
  review_count: field(),
  reviews: field()
    .args({
      pageSize: CATALOG_REVIEWS_PER_PAGE,
    })
    .fields({
      items: field({
        ...Review(),
      }),
    }),
})

return query
```

This function can contains two or three parameters. <br />
First of all, you have to specify the query itself which will be extended. Then you can, or not, to specify the query path, which will be extended (_if no path will be provided, the root path of query will be used_). The last, you have to specify fileds itself, which you want to include inside your query request. <br />
Finally, you can, for example, return the query itself, which will now contains original fields and also fields added by `addFields()` function.
