# Best practices

## Recursive mappers

Sometimes, mapper has to call itself (category containing child categories). Such mappers should import itself from IoC and use this imported value to call itself recursively.

### Example

```typescript
// mappers/ToCategory.ts

import ToCategory from '#ioc/mappers/ToCategory'

export default (data: any) => ({
  id: data.id as string,
  name: data.name as string,
  children: data.children.map(ToCategory),
})
```

:::warning
Types of recursive mappers can't be inferred by TypeScript. Either, the recursive fields have to be typed as any or explicit interface has to be used.
:::

## Typing extensions

Extensions can be typed easily with two generic types.

### Example

```typescript
// composables/useProduct.ext.ts

interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(useProduct: T): (...arg: any) => ReturnType<T> & Ext
}

interface Message {
  message: string
}

const useProduct: Extension<Message> =
  (useProduct) =>
  (...args) => {
    const product = useProduct(...args)

    product.message = 'Hello, World!'

    return product
  }
```
