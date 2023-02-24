import type { App } from 'vue'

export const after = async (app: App, ctx: any) => {
  let first = Infinity
  let last = -Infinity
  let longestName = 0

  for (const [gql, opts] of ctx.requestProfiler.entries()) {
    if (first > opts.from) first = opts.from
    if (last < opts.to) last = opts.to
    if (longestName < gql._name.length) longestName = gql._name.length
  }

  console.log('')
  console.log(`SSR request profile for URL "${ctx.req.url}", total time: ${last - first}ms`)

  for (const [gql, opts] of ctx.requestProfiler.entries()) {
    const ms = opts.to - opts.from

    const percentStart = Math.round(((opts.from - first) / (last - first)) * 100)
    const percentEnd = Math.round(((opts.to - first) / (last - first)) * 100)

    const stringBefore = new Array(percentStart).join(' ')
    const stringAfter = new Array(percentEnd - percentStart).join('-')

    console.log(gql._name.padEnd(longestName, ' '), `${ms}ms`.padStart(7, ' '), stringBefore + stringAfter)
  }

  console.log('')
}
