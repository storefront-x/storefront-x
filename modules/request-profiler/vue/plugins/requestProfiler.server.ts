import verbose from '#ioc/config/requestProfiler/verbose'
import isEmpty from '#ioc/utils/isEmpty'
import Context from '#ioc/types/base/Context'
import consola from 'consola'
import type { App } from 'vue'

const logger = consola.withTag('request-profiler')

export const after = async (app: App, ctx: Context) => {
  let first = Infinity
  let last = -Infinity
  let longestName = 0

  for (const [gql, opts] of ctx.requestProfiler.entries()) {
    if (first > opts.from) first = opts.from
    if (last < opts.to) last = opts.to
    if (longestName < gql._name.length) longestName = gql._name.length
  }

  logger.log('')
  logger.log(`SSR request profile for URL "${ctx.event.path}", total time: ${last - first}ms`)

  for (const [gql, opts] of ctx.requestProfiler.entries()) {
    opts.to ??= opts.from

    const ms = opts.to - opts.from

    const percentStart = Math.round(((opts.from - first) / (last - first)) * 100)
    const percentEnd = Math.round(((opts.to - first) / (last - first)) * 100)

    const stringBefore = new Array(percentStart + 1).join(' ')
    const stringLine = new Array(percentEnd - percentStart + 1).join('-')
    const stringAfter = new Array(100 - percentEnd + 1).join(' ')

    logger.log(
      gql._name.padEnd(longestName, ' '),
      `${ms}ms`.padStart(7, ' '),
      '|' + stringBefore + stringLine + stringAfter + '|',
    )

    if (verbose && !isEmpty(gql._bindings)) logger.log(` - ${JSON.stringify(gql._bindings)}`)
  }

  logger.log('')
}
