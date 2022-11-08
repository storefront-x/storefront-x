import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { App, computed, reactive, readonly, ref, shallowRef } from 'vue'
import { layouts, routes } from '~/.sfx/pages'

interface CreateRouterOptions {
  history: ReturnType<typeof createHistory>
  routes: any
}

export const createRouter = (options: CreateRouterOptions) => {
  const $layout = shallowRef<any>(null)
  const $page = shallowRef<any>(null)

  const push = async (path: string) => {
    for (const layout of layouts) {
      if (layout.path.test(path)) {
        if ($layout.value !== layout) {
          $layout.value = layout
        }

        break
      }
    }

    for (const route of routes) {
      if (route.path.test(path)) {
        if ($page.value !== route) {
          $page.value = route
        }

        break
      }
    }

    options.history.url.value = path

    if (IS_CLIENT) {
      history.pushState(null, null, path)
    }
  }

  const resolve = (input: any) => {
    return {
      path: input.path,
      fullPath: input.path,
    }
  }

  const params = computed(() => {
    const path = options.history.url.value

    return path.match($page.value.path)?.groups ?? {}
  })

  const query = computed(() => {
    return {}
  })

  return {
    push,
    install: (app: App) => {
      app.provide(
        '$route',
        reactive({
          path: readonly(options.history.url),
          fullPath: readonly(options.history.url),
          params,
          query,
        }),
      )

      app.provide(
        '$router',
        reactive({
          push,
          resolve,
          $page,
          $layout,
        }),
      )
    },
  }
}

export const createWebHistory = () => {
  const history = createHistory()

  return {
    ...history,
  }
}

export const createMemoryHistory = () => {
  const history = createHistory()

  return {
    ...history,
  }
}

const createHistory = () => {
  const url = ref('')

  return {
    url,
  }
}
