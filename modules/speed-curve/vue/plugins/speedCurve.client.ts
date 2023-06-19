import type { App } from 'vue'

export default async (app: App, ctx: any) => {
  const router = ctx.$router

  router.beforeEach(() => {
    // @ts-ignore
    window.LUX.send()
    // @ts-ignore
    window.LUX.init()
  })
}
