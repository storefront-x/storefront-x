/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import { computed, defineComponent, h, provide, reactive, Suspense } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'SfxPageOutlet',
  setup: () => {
    return () =>
      h(
        RouterView,
        {},
        {
          default: (slot: any) => {
            const key = slot.route.path

            return h(
              Suspense,
              {},
              {
                default: () => h(SfxRouteProvider, { key, pageKey: key, component: slot.Component, route: slot.route }),
              },
            )
          },
        },
      )
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
