import type { App } from 'vue'

export const after = async (app: App, ctx: any) => {
  if (!ctx.manifest) ctx.manifest = {}

  const rendered = preloadLinks(ctx)

  ctx.out.preloadLinks = (html: string) => html.replace('</head>', `${rendered}\n</head>`)
}

function preloadLinks(ctx: Record<string, any>): string {
  let links = ''

  const modules = ctx.modules ?? new Set()
  const modulesAsync = ctx.modulesAsync ?? new Set()
  const seen = new Set()

  for (const module of modules) {
    const files = ctx.manifest[module]

    if (!files) continue

    const isAsync = modulesAsync.has(module)

    for (const file of files) {
      if (seen.has(file)) continue

      seen.add(file)

      if (!isAsync) links += renderPreloadLink(file)
    }
  }

  return links
}

function renderPreloadLink(file: string): string {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    return ''
  }
}
