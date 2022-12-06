import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { App, computed, reactive, ref, shallowRef, nextTick, DefineComponent } from 'vue'
import isArray from '#ioc/utils/isArray'
import isEmpty from '#ioc/utils/isEmpty'

interface RouteLocationRaw {
  path: string
  name: string
  query: { [key: string]: string }
  params: { [key: string]: string } | null
  hash: string
}
interface RouteLocation {
  path: string
  fullPath: string
  query: { [key: string]: string }
  params: { [key: string]: string } | null
  hash: string
}

interface routeRaw {
  name: string
  path: RegExp
  readablePath: string
  component: DefineComponent
  alias: RegExp[]
}

export const createRouter = ({ routes, layouts = [] }: { routes: routeRaw[]; layouts: routeRaw[] | [] }) => {
  const $view = shallowRef<any>({ layout: null, page: null })
  let _layout = {} as routeRaw
  let _page = {} as routeRaw
  const $props = shallowRef<any>(null)
  const $history = reactive<any>({ location: null })
  const $currentPath = ref('')
  const $pathMatch = ref()
  const $ready = ref(false)

  const popStateHandler = ({ state }: { state: any }) => {
    if (state) {
      push(state.path, false)
    }
  }

  if (IS_CLIENT) {
    window.addEventListener('popstate', popStateHandler)
  }

  const push = async (rawLocation: string | RouteLocationRaw, pushHistory = true) => {
    $ready.value = false
    let locationToMatch = {} as RouteLocationRaw
    let matchedParams = null

    if (typeof rawLocation === 'string') {
      locationToMatch = parseURL(parseQuery, rawLocation.startsWith('/') ? rawLocation : '/' + rawLocation)
    } else if (typeof rawLocation === 'object') {
      locationToMatch = { ...rawLocation, ...resolveLocation(rawLocation) }
    } else {
      throw new Error('Wrong path pushed')
    }

    $currentPath.value = locationToMatch.path
    outer: for (const layout of layouts) {
      if ('alias' in layout) {
        for (const alias of layout.alias) {
          if (alias.test($currentPath.value)) {
            if ($view.value.layout !== layout) {
              _layout = layout
            }

            break outer
          }
        }
      }
      if (layout.path.test($currentPath.value)) {
        if ($view.value.layout !== layout) {
          _layout = layout
        }

        break
      }
    }

    if ('name' in locationToMatch) {
      const matchedRoute = routes.find((r) => r.name === locationToMatch.name)
      if ($view.value.page !== matchedRoute) {
        _page = matchedRoute
      }
    } else {
      outer: for (const route of routes) {
        if ('alias' in route) {
          for (const alias of route.alias) {
            if (alias.test($currentPath.value)) {
              if ($view.value.page !== route) {
                _page = route
              }
              matchedParams = $currentPath.value.match(alias)?.groups ?? null

              if (matchedParams) {
                locationToMatch.params = { ...locationToMatch.params, ...matchedParams }
              }

              break outer
            }
          }
        }

        if (route.path.test($currentPath.value)) {
          if ($view.value.page !== route) {
            _page = route
          }
          matchedParams = $currentPath.value.match(route.path)?.groups ?? null

          if (matchedParams) {
            locationToMatch.params = { ...locationToMatch.params, ...matchedParams }
          }
          break
        }
      }
    }
    if (matchedParams && matchedParams.pathMatch) {
      $pathMatch.value = matchedParams.pathMatch
    } else {
      if ($currentPath.value === '/') {
        $pathMatch.value = $currentPath.value
      } else {
        $pathMatch.value = $currentPath.value.replace(/^\/+/g, '')
      }
    }
    $view.value = { layout: _layout, page: _page }

    await nextTick()

    $history.location = locationToMatch

    if (IS_CLIENT) {
      pushHistory && history.pushState({ path: $history.location.fullPath }, '', $history.location.fullPath)

      const scrollBehavior = getScrollBehavior($history.location)

      window.scrollTo(scrollBehavior)
    }
  }

  const replace = (input: RouteLocationRaw) => {
    const { path } = resolveLocation(input)
    push(path, false)
  }

  const resolve = (input: any) => {
    return resolveLocation(input)
  }

  const resolveLocation = (rawLocation: RouteLocationRaw) => {
    let resolvedFullPath = ''
    let resolvedPath = ''
    const { path, query, hash, name, params } = rawLocation
    if (path) {
      resolvedPath = path
      resolvedFullPath = path
    } else if (name) {
      const matchedReadablePath = resolveNamedLocation(name, params)
      resolvedPath = matchedReadablePath
      resolvedFullPath = matchedReadablePath
    } else {
      resolvedPath = $currentPath.value
      resolvedFullPath = $currentPath.value
    }

    if (query) {
      resolvedFullPath += encodeQuery(query)
    }
    if (hash) {
      resolvedFullPath += hash
    }

    return { path: resolvedPath, fullPath: resolvedFullPath }
  }

  const resolveNamedLocation = (name: string, params: { [key: string]: string } | null) => {
    const matchedRoute = routes.find((r) => r.name === name)
    if (!matchedRoute) {
      throw Error('no route matched to this name')
    }
    if (params) {
      return matchedRoute.readablePath.replace(/\[(.+?)\]/g, (_: string, $1: string) => `${params[$1]}`)
    } else {
      return matchedRoute.readablePath
    }
  }

  const isReady = async (): Promise<void> => {
    let test = 0
    while (test < 5) {
      test++
      await nextTick()
      if ($ready.value) return Promise.resolve()
    }
    return Promise.reject()
  }

  $ready.value = true
  const route = reactive({
    path: computed(() => $history.location.path),
    fullPath: computed(() => $history.location.fullPath),
    params: computed(() => $history.location.params),
    query: computed(() => $history.location.query),
    hash: computed(() => $history.location.hash),
  })
  const router = reactive({
    push,
    replace,
    resolve,
    $view,
    $currentPath,
    $pathMatch,
    $props,
  })
  return {
    push,
    isReady,
    install: (app: App) => {
      app.config.globalProperties.$router = router
      app.config.globalProperties.$route = route
      app.provide('$route', route)

      app.provide('$router', router)
    },
  }
}

const getScrollBehavior = (to: RouteLocation): ScrollToOptions => {
  if (to?.params?.savePosition) return { top: window.pageYOffset, behavior: 'smooth' }

  return { top: 0, left: 0, behavior: 'smooth' }
}

const parseURL = (parseQuery: (search: string) => any, location: string, currentLocation = '/'): any => {
  let path
  let query = {}
  let searchString = ''
  let hash = ''

  const hashPos = location.indexOf('#')
  let searchPos = location.indexOf('?')
  // the hash appears before the search, so it's not part of the search string
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1
  }

  if (searchPos > -1) {
    path = location.slice(0, searchPos)
    searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length)

    query = parseQuery(searchString)
  }

  if (hashPos > -1) {
    path = path || location.slice(0, hashPos)
    // keep the # character
    hash = location.slice(hashPos, location.length)
  }

  // no search and no query
  path = resolveRelativePath(path != null ? path : location, currentLocation)
  // empty path means a relative query or hash `?foo=f`, `#thing`

  return {
    fullPath: path + (searchString && '?') + searchString + hash,
    path,
    query,
    hash,
  }
}

const resolveRelativePath = (to: string, from: string): string => {
  if (to.startsWith('/')) return to

  if (!to) return from

  const fromSegments = from.split('/')
  const toSegments = to.split('/')

  let position = fromSegments.length - 1
  let toPosition: number
  let segment: string

  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition]

    // we stay on the same position
    if (segment === '.') continue
    // go up in the from array
    if (segment === '..') {
      // we can't go below zero, but we still need to increment toPosition
      if (position > 1) position--
      // continue
    }
    // we reached a non-relative path, we stop here
    else break
  }

  return (
    fromSegments.slice(0, position).join('/') +
    '/' +
    toSegments
      // ensure we use at least the last element in the toSegments
      .slice(toPosition - (toPosition === toSegments.length ? 1 : 0))
      .join('/')
  )
}

const parseQuery = (search: string): any => {
  const query: any = {}
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?') return query
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(/\+/g, ' ')
    // allow the = character
    const eqPos = searchParam.indexOf('=')
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))

    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key]
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue]
      }
      // we force the modification
      ;(currentValue as any[]).push(value)
    } else {
      query[key] = value
    }
  }

  return query
}

const decode = (text: string | number): string => {
  try {
    return decodeURIComponent('' + text)
  } catch (err) {
    console.warn(`Error decoding "${text}". Using original value`)
  }
  return '' + text
}

const encodeQuery = (query: { [key: string]: string | [] }) => {
  const _query = { ...query }
  Object.keys(_query).map((q: string) => isEmpty(_query[q]) && delete _query[q])
  if (Object.keys(_query).length) {
    return (
      '?' +
      Object.keys(_query)
        .map((q: string) => {
          const _q = _query[q]
          if (isArray(_q)) {
            return _q.map((s: string) => `${q}=${s}`).join('&')
          }
          return `${q}=${_q}`
        })
        .join('&')
        .toString()
    )
  } else return ''
}
