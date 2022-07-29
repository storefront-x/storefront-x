# GraphQL

Storefront X contains powerful builder for GraphQL queries, mutations $ fragments. Its syntax is similar to GraphQL text files but has few additions/changes due to limitations of JavaScript.

## Fields

> GraphQL documentation about fields [here](https://graphql.org/learn/queries/#fields).

Lets imagine simples GraphQL query:

```graphql
query {
  products {
    id
    sku
    name
  }
}
```

In Storefront X GraphQL builder it is written like this:

```javascript
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
// IS_FEATURE_ENABLED is true or false
import IS_FEATURE_ENABLED from '#ioc/config/IS_FEATURE_ENABLED'

query({
  products: field({
    id: field(),
    feature: IS_FEATURE_ENABLED && field(),
  }),
})
```

## Arguments

> GraphQL documentation about arguments [here](https://graphql.org/learn/queries/#arguments).

GraphQL supports arguments which can be used for sorting, searching, filtering, pagination, ... Arguments in GraphQL are added in parentheses like this:

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

Generally for GraphQL queries to be useful, they have to be configurable during runtime. This is done using variables, which are first defined in the query and during runtime, specific values can be passed in. Variables are most commonly used in addition with arguments.

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

Variables have to start with the dollar sign because they are directly translated to GraphQL query.

Later, when we know concrete values we want to assign to variables, we use `.with()` method to bind them.

```javascript
productsQuery.with({
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

Because in SFX, GraphQL queries are pure JS, it's easy to combine them with other JS objects. We leverage this mechanism for GraphQL gragments.

```javascript
// fragments/cartItems.js
import { field } from '@storefront-x/storefront/adapters/GraphQL'

export const cartItemsFragment = {
  items: field({
    id: field(),
    quantity: field(),
    product: field({
      sku: field(),
      name: field(),
    }),
  }),
}
```

```javascript
// queries/cartItems.js
import { query, field } from '@storefront-x/storefront/adapters/GraphQL'
import { cartItemsFragment } from '../fragments/cartItems'

export const cartItemsQuery = query()
  .variables({
    $cartId: 'String!',
  })
  .fields({
    cartItems: field('cart')
      .args({
        cart_id: '$cartId',
      })
      .fields({
        // We can spread fragments to reuse code
        ...cartItemsFragment,
      }),
  })
```

### Hoisting

While basic fragments are certainly useful, having the same fragment multiple times in one query will cause the query to inflate really quickly. GraphQL standard supports declaring fragments outside the query and then referencing them later.

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

To achieve this in Storefront X GraphQL build we just need to wrap the fragment in a `fragment` function call. First argument is fragment identifier and second in type upon which it operates.

```javascript
const product = fragment('product', 'ProductInterface', {
  sku: field(),
  name: field(),
})

const productQuery = query({
  items: field({
    ...product,
    related_products: field({
      ...product,
    }),
    upsell_products: field({
      ...product,
    }),
  }),
})
```

This technique results in shorted generated queries (no duplication of fragments).

## Mutations

Storefront X GraphQL builder also supports mutations. They have exactly the same syntax as queries, except we start mutation with `mutation()` function helper.

```javascript
import { mutation, field } from '@storefront-x/storefront/adapters/GraphQL'

export const generateCustomerTokenMutation = mutation()
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

After query/mutation is built, variables assigned, we fetch the results using `.fetch()` method. This method takes one argument - the context.

The fetch method returns a promise which resolves to object containing all resolved top level fields.

```javascript
const myQuery = query({
  products: field({
    name: field(),
  }),
  categories: field({
    name: field(),
  }),
})

const { products, categories } = await myQuery.fetch(ctx)
```

## Caching

By default, GQL queries are cached. Mutations are never cached. This should be OK for 80% of the cases. But sometimes we want to sacrifice speed for having query results to be 100% up to date. We can do this using the `.cantBeCached()` method which will make the query use POST HTTP method which is not cached.

```javascript
const sensitiveQuery = query()
  .cantBeCached()
  .fields({
    cart: field({
      items: field({
        sku: field(),
      }),
    }),
  })
```
