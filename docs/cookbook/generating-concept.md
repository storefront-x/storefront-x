# How to use generating concept

Sometimes, you might wish for your concept to generate a single file which re-exports all the files inside concept directories as a single object. This is useful, for example, if you want some file to import all the concept files at once.

> `my-module/concepts/PaymentMethods.js`

```js
import { GeneratingConcept } from '@storefront-x/core'

export default class PaymentMethods extends GeneratingConcept {
  get directory() {
    return 'paymentMethods'
  }
}
```

This concept now generates single file called `paymentMethods.js` inside the `.sfx/` directory, which you can use like this:

```ts
import paymentMethods from '~/.sfx/paymentMethods'

console.log(paymentMethods) // object with all payment methods
```
