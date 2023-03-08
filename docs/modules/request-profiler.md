# Request Profiler

> `@storefront-x/request-profiler`

When enabled, this module will start logging network requests performed during SSR to the console.

```
SSR request profile for URL "/office.html", total time: 2140ms
CategoryList            1054ms |------------------------------------------------                                                   |
CatalogUrlSuffixes       179ms |-------                                                                                            |
Customer                 617ms |----------------------------                                                                       |
FreeShippingConfig       182ms |--------                                                                                           |
StoreConfig              180ms |--------                                                                                           |
GetAvailableCurrencies   214ms |---------                                                                                          |
GetRobots                194ms |--------                                                                                           |
Wishlists                401ms |                             ------------------                                                    |
Wishlists                449ms |                             --------------------                                                  |
UrlResolver              151ms |                                                   ------                                          |
CategoryDetail           887ms |                                                           ----------------------------------------|
```

It prints name of the requests made during server-side rendering, how long each request took, and timeline visualizing when the requests started and when they ended. From this visualization, you can easily see which requests run in parallel and which run in series.

## Verbose

You can use the `--request-profiler-verbose` CLI flag, or override the `config/requestProfiler/verbose.ts` file to enable verbose logging with even more information.

```
SSR request profile for URL "/", total time: 2140ms
CategoryList            1055ms |------------------------------------------------                                                   |
CatalogUrlSuffixes       133ms |-----                                                                                              |
Customer                 531ms |------------------------                                                                           |
FreeShippingConfig       144ms |------                                                                                             |
StoreConfig              132ms |-----                                                                                              |
GetAvailableCurrencies   151ms |------                                                                                             |
GetRobots                123ms |-----                                                                                              |
Wishlists                487ms |                         ----------------------                                                    |
Wishlists                487ms |                         ----------------------                                                    |
CmsBlock                 140ms |                                                  ------                                           |
 - {"identifiers":["slider_hp"]}
CmsBlock                 394ms |                                                  ------------------                               |
 - {"identifiers":["top_sell_hp"]}
CategoryList            1062ms |                                                  -------------------------------------------------|
BlogPosts                231ms |                                                  ----------                                       |
 - {"type":"ALL","page":1}
ProductList              440ms |                                                                      -------------------          |
 - {"skus":["8543780","4015867162965","5011858561464","3221610122808"]}
```

## Development only

:::warning
This module should be enabled only in development.
:::

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
