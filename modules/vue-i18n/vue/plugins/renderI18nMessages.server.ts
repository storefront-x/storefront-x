import type { App } from 'vue'
import { uneval } from 'devalue'

const allMessages = import.meta.glob<{ default: Record<string, unknown> }>('~/.sfx/i18n/messages/*.json', {
  eager: true,
})

export const after = async (app: App, ctx: any) => {
  const locale = ctx.$i18n.global.locale.value

  const localeMessages = allMessages[`/i18n/messages/${locale}.json`]?.default ?? {}

  ctx.out.i18nMessages = (html: string) =>
    html.replace('</body>', `<script>window.$i18nMessages=${uneval(localeMessages)}</script>\n</body>`)
}
