import type { App } from 'vue'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import dsn from '#ioc/config/sentry/client/dsn'
import tracesSampleRate from '#ioc/config/sentry/client/tracesSampleRate'
import environment from '#ioc/config/sentry/client/environment'

export default async (app: App) => {
  Sentry.init({
    app,
    dsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate,
    environment,
  })
}
