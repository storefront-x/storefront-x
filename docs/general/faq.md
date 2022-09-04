# Frequently Asked Questions

## Why lot of files are named `useSomething`?

These files contain so called composables. They are function which need to be executed in synchronous context of the application (before any await is called). They are caled `useSomething` by convention to make evident u need to 'use' them first and only after that you can use their logic in asynchronous code.

### Example

```ts
import useFoo from '#ioc/composables/useFoo'
import useBar from '#ioc/composables/useBar'

export default async () => {
  const foo = useFoo()
  const bar = useBar()

  // All composables are used in synchronous part, now we can use await
  const fooResult = await foo()
  const barResult = await bar(fooResult)

  return barResult
}
```

## Why composables like `useProduct` return computed values wrapped in reactive object?

Because computed properties require use of `.value`. By wrapping them in reactive object, we can omit the `.value (unless the reactive object is deconstructed).

```ts
import { computed, reactive } from 'vue'

const foo = computed(() => 'foo')
const bar = computed(() => 'bar')

const obj1 = { foo, bar }

console.log(obj1.foo.value) // foo

const obj2 = reactive({ foo, bar })

console.log(obj1.foo) // foo
```

## Why are modules inside the `modules` directory?

Because the `modules` directory is specified as `workspace` in the root `package.json`.

Storefront X are valid NPM packages discoverable from `node_modules`. The `workspace` property tells the package manager that directories inside of it can contain NPM packages and that they should be linked into `node_modules`. This means that you can change the name of the `modules` directory, or split Storefront X modules into multiple module directories.
