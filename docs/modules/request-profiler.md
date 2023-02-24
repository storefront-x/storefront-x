# Request Profiler

> `@storefront-x/request-profiler`

When enabled, this module will start logging network requests performed during SSR to the console.

```
SSR request profile for URL "/office.html", total time: 2157ms
CategoryList             978ms --------------------------------------------
CatalogUrlSuffixes       151ms ------
Customer                 481ms ---------------------
FreeShippingConfig       153ms ------
StoreConfig              150ms ------
GetAvailableCurrencies   181ms -------
GetRobots                154ms ------
Wishlists                452ms                       -------------------
Wishlists                450ms                       -------------------
UrlResolver              141ms                                              ------
CategoryDetail           904ms                                                          -----------------------------------------
```

It prints name of the requests made during server-side rendering, how long each request took, and timeline visualizing when the requests started and when they ended. From this visualization, you can easily see which requests run in parallel and which run in series.

To enable this module only in development, you can condition it in your SFX config file like this:

```js
export default {
  modules: [
    // modules...
    ...(process.env.NODE_ENV === 'development' ? ['@storefront-x/request-profiler'] : []),
    // modules...
  ],
}
```
