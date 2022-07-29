import type { App } from 'vue'
import { renderHeadToString } from '@vueuse/head'

export const after = async (app: App, ctx: any) => {
  const rendered = renderHeadToString(ctx.$head)

  // TODO: Ugh...
  ctx.out.head = (html: string) =>
    html
      .replace('</head>', `${rendered.headTags}</head>`)
      .replace('<html>', `<html${rendered.htmlAttrs}>`)
      .replace('<body>', `<body${rendered.bodyAttrs}>`)
}
