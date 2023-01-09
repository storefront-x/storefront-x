# Base

> `@storefront-x/base`

This is the base module for the whole application. It is framework and application agnostic, so it provides only the general functionality and it should always be enabled.

## `config/` concept

The base module provides `config/` IoC concept. It's purpose is to contain application configuration.

### Example

```ts
// config/APP_NAME.ts

export default 'Storefront X'
```

```vue
<!-- components/Heading.vue -->

<template>
  <h1>{{ APP_NAME }}</h1>
</template>

<script setup lang="ts">
import APP_NAME from '#ioc/config/APP_NAME'
</script>
```

### Different configs for different environments

There are two approaches, how to handle configuration files for different environments.

1. Create different modules for different environments with configs for said environment.
2. Use `.env` file and load config values from there.

The first approach si generally recommended because Storefront X relies heavily on modules and overriding between them, so we just leverage that functionality. Sometimes, env variables need to be used (you don't want to commit keys to the repository). Read more [here](/essentials/dotenv).

## `public/` concept

Serves static files. Their path determines URL under which they are accessible. So, file `some-module/public/icon.svg` will be accessible under the `https://my.site/icon.svg` URL and file `some-module/public/nested/dir/pic.png` will be accessible under the `https://my.site/nested/dir/pic.png` URL.

:::tip
Using the [`assets/` concept](#assets-ioc-concept) is preferable, because public files are served as they are. Files from assets concept have hashed names to avoid stale cache problems during releases. Some files need to be served as they are (eg. robots.txt), so for those, the public concept is good enough.
:::

## `assets/` IoC concept

Concept for static assets (CSS, images, etc.) that will be build into the application, instead of being served via the `public/` concept.

### Styles

Styles inside the assets concept need to be imported like this to take an effect:

```vue
<template>
  <h1>Hello, World!</h1>
</template>

<script setup>
import '#ioc/assets/style'
</script>
```

These styles are then downloaded as separate .css files.

If you wish styles to be inlined inside the initial HTML response, use the [`global/styles/` concept](#global-styles-concept).

### Other assets

Assets like images or icons need to be imported and then used like this:

```vue
<template>
  <img :src="logo" />
</template>

<script setup>
import logo from '#ioc/assets/logo'
</script>
```

These assets are then downloaded as separate files.

## `global/styles/` concept

Concept for global styles that are rendered in the initial HTML response. They don't need to be imported.

### Example

```css
/* global/styles/style.css */

body {
  background-color: red;
}
```

Returned index.html:

```html
<html>
  <head>
    <!-- rest of the head -->

    <style>
      body {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <!-- the application -->
    </div>
  </body>
</html>
```

## `server/middleware/` concept

Files with [Express](https://expressjs.com) middleware function exported as default export. They are applied to the server as `.use` middleware.

### Example

```ts
// server/middleware/foo.ts

import type { Request, Response } from 'express'

export default (req: Request, res: Response) => res.send('Hello, World!')
```

```
GET  /     # Hello, World!
GET  /foo  # Hello, World!
POST /foo  # Hello, World!
GET  /bar  # Hello, World!
POST /bar  # Hello, World!
```

## `server/routes/` concept

Files with [Express](https://expressjs.com) middleware function exported as default export. They are applied to the server as route handlers with path corresponding to the pathname of the file. So, request to `https://my.site/foo` will be handled by the `some-module/server/routes/foo.ts` server route, but won't be handled by the `some-module/server/routes/bar` server route.

### Example

```ts
// server/middleware/foo.ts

import type { Request, Response } from 'express'

export default (req: Request, res: Response) => res.send('Hello, World!')
```

```
GET  /     # index.html
GET  /foo  # Hello, World!
POST /foo  # Hello, World!
GET  /bar  # index.html
POST /bar  # index.html
```

:::tip
Use server routes as proxies to decrease number of DNS requests and to improve caching.
:::

## `utils/` IoC concept

Concept containing utility functions.

## `base/templates/` concept

:::warning
Advanced concept!
:::

Concept copying files from the `base/templates/` directories to the build (`.sfx/`) directory. Used by framework modules (`@storefront-x/vue`) as a starting point for the application.

## `IS_CLIENT` config

Returns `true`, if the code is being run in the browser. Otherwise, returns `false`. Can be used for [dead code elimination](https://en.wikipedia.org/wiki/Dead-code_elimination).

### Example

```vue
<template>
  <h1>{{ msg }}</h1>
</template>

<script setup lang="ts">
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { ref } from 'vue'

const msg = ref('this code errors due to render mismatch')

if (IS_CLIENT) {
  msg.value = 'on client'
} else {
  msg.value = 'on server'
}
</script>
```

## `IS_SERVER` config

Like `IS_CLIENT`, but returns `true` on the server side.

## `IS_DEVELOPMENT` config

Returns `true` if the code is run in development mode (`yarn dev`).

## `IS_PRODUCTION` config

Like `IS_DEVELOPMENT`, but for production mode (`yarn serve`).
