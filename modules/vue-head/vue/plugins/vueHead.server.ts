import type { App } from 'vue'
import { renderHeadToString } from '@vueuse/head'

export const after = async (app: App, ctx: any) => {
  const rendered = await renderHeadToString(ctx.$head)

  ctx.out.head = (html: string) =>
    html
      .replace('</head>', `${rendered.headTags}\n</head>`)
      .replace('<html>', `<html${rendered.htmlAttrs}>`)
      .replace('<body>', `<body${rendered.bodyAttrs}>`)
}
