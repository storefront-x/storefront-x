# How to use IoC concept

IoC concepts are the most common and the most easy to create. Just add the concept to the `concepts/` directory in your module.

> `my-module/concepts/Foobars.js`

```js
import { IocConcept } from '@storefront-x/core'

export default class Foobars extends IocConcept {
  get directory() {
    return 'foobars'
  }
}
```

:::warning
Concept file has to be in JavaScript!
:::

Now restart the dev server and you should be able to import files in `foobars/` directories of enabled modules via the `#ioc` alias.

> `my-modules/foobars/Baz.ts`

```ts
export default 'Buzz'
```

```ts
import Baz from '#ioc/foobars/Baz'

console.log(Baz) // 'Buzz'
```
