# Debug Tools

> `@storefront-x/debug-tools`

Debug tools help you with debugging Storefront X by visualizing some of its functionality like server-side requests.

To see the debug tools, enable this module, start your application and visit the `http://localhost:3000/_debug` page (hostname and port depends on your configuration). It should look something like this:

![Debug Tools](/assets/images/debug-tools.png)

:::tip
Content of this page should update automatically. It thats not the case, refresh the page to see the latest data.
:::

## Development only

:::warning
This module should be enabled only in development.
:::

To enable this module only in development, you can condition it in your SFX config file like this:

```js
export default {
  modules: [
    // modules...
    ...(process.env.NODE_ENV === 'development' ? ['@storefront-x/debug-tools'] : []),
    // modules...
  ],
}
```

## Server requests

Under this section you can see all of the network requests (and their details) executed during server-side rendering of singular page. These requests are not visible in the browsers network tab because they are executed only on the server.