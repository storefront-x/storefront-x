import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { App, computed, reactive, readonly, ref, shallowRef } from 'vue'
import { routes } from '~/.sfx/pages'

interface CreateRouterOptions {
  history: ReturnType<typeof createHistory>
  routes: any
}

export const createRouter = (options: CreateRouterOptions) => {
  const $page = shallowRef<any>(null)

  const push = async (path: string) => {
    for (const route of routes) {
      if (route.path.test(path)) {
        $page.value = route
        break
      }
    }

    options.history.url.value = path

    if (IS_CLIENT) {
      history.pushState(null, null, path)
    }
  }

  const params = computed(() => {
    const path = options.history.url.value

    return path.match($page.value.path)?.groups ?? {}
  })

  return {
    push,
    install: (app: App) => {
      app.provide(
        '$route',
        reactive({
          path: readonly(options.history.url),
          params,
          $page,
        }),
      )

      app.provide(
        '$router',
        reactive({
          push,
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
