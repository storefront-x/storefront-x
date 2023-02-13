import * as Sentry from '@sentry/node'
import dsn from '#ioc/config/sentry/server/dsn'
import tracesSampleRate from '#ioc/config/sentry/server/tracesSampleRate'
import environment from '#ioc/config/sentry/server/environment'

// Importing @sentry/tracing patches the global hub for tracing to work.
import '@sentry/tracing'

Sentry.init({
  dsn,
  tracesSampleRate,
  environment,
})
