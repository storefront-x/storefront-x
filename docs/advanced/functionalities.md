# Functionalities

## Client-side rendering fallback

When Storefront X encounters a critical error during server-side rendering, it bails and returns empty HTML with entrypoint JavaScript. This basically serves the Storefront X application as SPA (fully client-side rendered). This client-side rendered version has a decent chance to display most of the data to the user (instead of showing blank server error page). Unfortunately, because some data are fetched on server only (menu, customer), this version won't be complete. In attempt to fix this, Storefront X will do a full page reload on every navigation in attempt to successfully do a server-render and serve fully working application.

This behavior is enabled only in production (`yarn serve`) and can be disabled with the `--failOnServerError` flag.

## Compression of assets

By default, Storefront X doesn't use any compression of assets nor rendered HTML. This compression should be handled by web server like Nginx or Apache.

If you want Storefront X to compress assets and rendered HTML in production (`yarn serve`), use the `--compression` flag.
