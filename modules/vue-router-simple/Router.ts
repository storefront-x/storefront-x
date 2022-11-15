import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { App, computed, reactive, ref, shallowRef, nextTick, DefineComponent } from 'vue'
import isArray from '#ioc/utils/isArray'
import isEmpty from '#ioc/utils/isEmpty'

interface RouteLocationRaw {
  path: string
  query: { [key: string]: string }
  params: { [key: string]: string }
  hash: string
}
interface RouteLocation {
  path: string
  fullPath: string
  query: { [key: string]: string }
  params: { [key: string]: string }
  hash: string
}

interface routeRaw {
  name: string
  path: RegExp
  component: DefineComponent
  alias: RegExp[]
}

export const createRouter = ({ routes, layouts = [] }: { routes: routeRaw[]; layouts: routeRaw[] | [] }) => {
  const $layout = shallowRef<any>(null)
  const $page = shallowRef<any>(null)
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
    let rawPath = ''
    let params = null

    if (typeof rawLocation === 'string') {
      rawPath = rawLocation.startsWith('/') ? rawLocation : '/' + rawLocation
    } else if (typeof rawLocation === 'object') {
      params = rawLocation?.params ?? null
      rawPath = resolveLocation(rawLocation)
    } else {
      throw new Error('Wrong path pushed')
    }

    $currentPath.value = rawPath.split('?')[0]

    for (const layout of layouts) {
      if (layout.path.test($currentPath.value)) {
        if ($layout.value !== layout) {
          $layout.value = layout
        }

        break
      }
    }

    outer: for (const route of routes) {
      if ('alias' in route) {
        for (const alias of route.alias) {
          if (alias.test($currentPath.value)) {
            if ($page.value !== route) {
              $page.value = route
            }
            $pathMatch.value = rawPath.match(alias)?.groups?.pathMatch.split('?')[0] ?? null
            break outer
          }
        }
      }

      if (route.path.test($currentPath.value)) {
        if ($page.value !== route) {
          $page.value = route
        }
        $pathMatch.value = rawPath.match(route.path)?.groups?.pathMatch.split('?')[0] ?? null
        break
      }
    }
    if ($pathMatch.value === '') {
      $pathMatch.value = rawPath
    }
    await nextTick()

    $history.location = { ...parseURL(parseQuery, rawPath), params }

    if (IS_CLIENT) {
      pushHistory && history.pushState({ path: $history.location.fullPath }, '', $history.location.fullPath)

      const scrollBehavior = getScrollBehavior($history.location)

      window.scrollTo(scrollBehavior)
    }
  }

  const resolve = (input: any) => {
    const { path } = input
    return {
      path: $currentPath.value,
      fullPath: path,
    }
  }

  const resolveLocation = (rawLocation: RouteLocationRaw) => {
    let resolvedPath = ''
    const { path, query, hash } = rawLocation
    if (path) {
      resolvedPath = path
    } else {
      resolvedPath = $currentPath.value
    }
    if (query) {
      resolvedPath += encodeQuery(query)
    }
    if (hash) {
      resolvedPath += hash
    }
    return resolvedPath
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

  return {
    push,
    isReady,
    install: (app: App) => {
      app.provide(
        '$route',
        reactive({
          path: computed(() => $history.location.path),
          fullPath: computed(() => $history.location.fullPath),
          params: computed(() => $history.location.params),
          query: computed(() => $history.location.query),
          hash: computed(() => $history.location.hash),
        }),
      )

      app.provide(
        '$router',
        reactive({
          push,
          resolve,
          $page,
          $layout,
          $currentPath,
          $pathMatch,
          $props,
        }),
      )
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
  return (
    '?' +
    Object.keys(_query)
      .map((q: string) => {
        if (isArray(_query[q])) {
          return _query[q].map((s: string) => `${q}=${s}`).join('&')
        }
        return `${q}=${_query[q]}`
      })
      .join('&')
      .toString()
  )
}
