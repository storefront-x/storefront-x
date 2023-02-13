# Sentry

> `@storefront-x/sentry-client` & `@storefront-x/sentry-server`

The [Sentry](https://sentry.io/welcome/) integration is made from two modules, so you can separately decide whether to use Sentry on the client and/or on the server.

## Client

### `config/sentry/client/dsn` config

This is the only mandatory config. It has to contain exported string with your DSN from the Sentry dashboard.

#### Example

```typescript
// config/sentry/client/dsn.ts

export default 'https://examplePublicKey@o0.ingest.sentry.io/0'
```

### `config/sentry/client/environment` config

This config controls [Sentry environment](https://docs.sentry.io/product/sentry-basics/environments/). By default it re-exports the `ENVIRONMENT` which is set to `development` or `production`.

#### Example

```typescript
// config/sentry/client/environment.ts
import ENVIRONMENT from '#ioc/config/ENVIRONMENT'

export default ENVIRONMENT
```

### `config/sentry/client/tracesSampleRate` config

Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring. We recommend adjusting this value in production

#### Example

```typescript
// config/sentry/client/tracesSampleRate.ts

export default 1.0
```

## Server

### `config/sentry/client/dsn` config

This is the only mandatory config. It has to contain exported string with your DSN from the Sentry dashboard.

#### Example

```typescript
// config/sentry/client/dsn.ts

export default 'https://examplePublicKey@o0.ingest.sentry.io/0'
```

### `config/sentry/server/environment` config

This config controls [Sentry environment](https://docs.sentry.io/product/sentry-basics/environments/). By default it re-exports the `ENVIRONMENT` which is set to `development` or `production`.

#### Example

```typescript
// config/sentry/server/environment.ts
import ENVIRONMENT from '#ioc/config/ENVIRONMENT'

export default ENVIRONMENT
```

### `config/sentry/server/tracesSampleRate` config

Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring. We recommend adjusting this value in production

#### Example

```typescript
// config/sentry/server/tracesSampleRate.ts

export default 1.0
```
