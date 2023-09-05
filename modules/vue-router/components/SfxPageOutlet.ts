/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import useEmitNavigationEnd from '#ioc/bus/emitters/useEmitNavigationEnd'
import useEmitNavigationStart from '#ioc/bus/emitters/useEmitNavigationStart'
import { computed, defineComponent, h, provide, reactive, Suspense, PropType } from 'vue'
import { RouterView, RouteLocation } from 'vue-router'

export default defineComponent({
  name: 'SfxPageOutlet',
  props: {
    pageKey: {
      type: [String, Function] as PropType<keyof RouteLocation | ((route: RouteLocation) => string)>,
      default: 'fullPath',
    },
  },
  setup: (props) => {
    const emitNavigationStart = useEmitNavigationStart()
    const emitNavigationEnd = useEmitNavigationEnd()

    const onPending = () => emitNavigationStart({})
    const onResolve = () => emitNavigationEnd({})

    // eslint-disable-next-line vue/no-setup-props-destructure
    const pageKey = props.pageKey

    const pageKeyFn = typeof pageKey === 'function' ? pageKey : (route: RouteLocation) => JSON.stringify(route[pageKey])

    const _default = (slot: any) =>
      h(
        Suspense,
        {
          onPending,
          onResolve,
        },
        {
          default: () =>
            h(SfxRouteProvider, {
              key: pageKeyFn(slot.route),
              pageKey: pageKeyFn(slot.route),
              component: slot.Component,
              route: slot.route,
            }),
        },
      )

    return () => h(RouterView, {}, { default: _default })
  },
})

const SfxRouteProvider = defineComponent({
  name: 'SfxRouteProvider',
  props: ['pageKey', 'component', 'route'],
  setup: (props) => {
    // Prevent reactivity when the page will be rerendered in a different suspense fork
    // eslint-disable-next-line vue/no-setup-props-destructure
    const previousKey = props.pageKey
    // eslint-disable-next-line vue/no-setup-props-destructure
    const previousRoute = props.route

    const route: any = {}
    for (const key in props.route) {
      route[key] = computed(() => (previousKey === props.pageKey ? props.route[key] : previousRoute[key]))
    }

    provide('_route', reactive(route))

    return () => h(props.component)
  },
})
