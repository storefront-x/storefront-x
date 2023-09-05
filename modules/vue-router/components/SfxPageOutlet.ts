/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import useEmitNavigationEnd from '#ioc/bus/emitters/useEmitNavigationEnd'
import useEmitNavigationStart from '#ioc/bus/emitters/useEmitNavigationStart'
import { computed, defineComponent, h, provide, reactive, Suspense, onErrorCaptured, ref } from 'vue'
import { RouterView } from 'vue-router'
import { Error } from '~/.sfx/pages'

export default defineComponent({
  name: 'SfxPageOutlet',
  setup: () => {
    const hasError = ref(false)

    const emitNavigationStart = useEmitNavigationStart()
    const emitNavigationEnd = useEmitNavigationEnd()

    const onPending = () => emitNavigationStart()
    const onResolve = () => emitNavigationEnd()

    onErrorCaptured(() => {
      hasError.value = true
    })

    const _default = (slot: any) =>
      !hasError.value
        ? h(
            Suspense,
            {
              onPending,
              onResolve,
            },
            {
              default: () =>
                h(SfxRouteProvider, {
                  key: slot.route.path,
                  pageKey: slot.route.path,
                  component: slot.Component,
                  route: slot.route,
                }),
            },
          )
        : h(Error)

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
