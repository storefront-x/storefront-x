# SpeedCurve

> `@storefront-x/speed-curve`

This module provides https://www.speedcurve.com/ integration.

Create account, and get your SpeedCurve ID for RUM.

## `speed-curve/SPEEDCURVE_ID` config

You can find SpeedCurve ID in your SpeedCurve RUM dashboard, inside the RUM snippet code. You need to override it by adding `config/speed-curve/SPEEDCURVE_ID.ts` to your module. To see how overriding works, click [here](/getting-started/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/speed-curve/SPEEDCURVE_ID.ts

export default 'YOUR ID HERE'
```

This module is using speedCurve in SPA mode, meaning it sends beacon data when the user navigates to a new page. This way, you will get all the measurements and interactions done by the user in between pages. Also, the beacon with data is sent when the user leaves the page ( or simply changes a tab in the browser ) and after default 60 seconds are spent on the page.

Labeling of pages can be done manually with `useAddSpeedCurveLabel` click [here](/modules/speed-curve.html#useaddspeedcurvelabel-composable) or using `emitPageViewLabel` from `@storefront-x/theme-tailwind` [here](/modules/theme-tailwind.html#pageviewlabel-event) with prepared listener doing the labeling in this module ( more about events and listeners [here](/advanced/event-bus.html) ). With this event you can use prepared labels from `config/PAGE_LABELS.ts` (only in Full-featured Magento module configuration). Of Course if you don't like default labels you can override them.

### Example

```vue
<!-- pages/index.vue -->

<template>
  <Heading>Homepage</Heading>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.HOMEPAGE)
})
</script>
```

## `useAddSpeedCurveLabel` composable

Composable used to add a custom label to speedCurve LUX object.

### Properties

- `label: string` - your custom label

### Example

```vue
<template>
  <button @click="addLabel">Label page</button>
</template>

<script setup lang="ts">
import useAddSpeedCurveLabel from '#ioc/composables/useAddSpeedCurveLabel'

const addSpeedCurveLabel = useAddSpeedCurveLabel()

const addLabel = () => {
  addSpeedCurveLabel('my-custom-label')
}
</script>
```

## custom data collection

There is a prepared solution together with `@storefront-x/magento` module which collects graphql requests names and time they took and sends them as custom metrics to speedCurve LUX object. Requests done during SSR rendering are prefixed with `SSR_`. You will also get `SSR_RequestsTotalResponseTime` custom metrics representing how long, total time, all the requests on graphql took during SSR rendering.

## `useAddSpeedCurveCustomMetrics` composable

Composable used to add a custom metrics to speedCurve LUX object.

### Properties

- `name: string` - your custom metrics name
- `value: any` - your custom metrics value

### Example

```vue
<template>
  <button @click="addMetrics">Label page</button>
</template>

<script setup lang="ts">
import useAddSpeedCurveCustomMetrics from '#ioc/composables/useAddSpeedCurveCustomMetrics'

const addSpeedCurveCustomMetrics = useAddSpeedCurveCustomMetrics()

const addMetrics = () => {
  addSpeedCurveCustomMetrics('my-custom-metric-name', 18890420)
}
</script>
```
